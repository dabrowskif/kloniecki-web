import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";
import { Calendar } from "~/utils/calendar";
import {
  type VisitsCalendar,
  type CalendarColumn,
  type PrivateCalendarCell,
  type PublicCalendarCell,
  type RawPrivateCellData,
} from "~/utils/calendar/types";
import { getPrivateCalendarColumn } from "../helpers/privateCalendar";
import { getPublicCalendarColumn } from "../helpers/publicCalendar";
import { GoogleCalendarService } from "../services/GoogleService";

export const calendarRouter = createTRPCRouter({
  getPublicCalendar: publicProcedure
    .input(
      z.object({
        weekStartDate: z.date(),
        weekEndDate: z.date(),
      })
    )
    .query(async ({ input }): Promise<VisitsCalendar<PublicCalendarCell>> => {
      try {
        const availableVisits = await prisma.availableVisit.findMany({
          where: {
            dateFrom: {
              gte: input.weekStartDate,
            },
            dateTo: {
              lte: input.weekEndDate,
            },
          },
          include: {
            visitReservation: true,
          },
        });

        const days = Calendar.getDays();
        const timeRanges = Calendar.getTimeRanges();
        const filteredTimeRanges = Calendar.removeUnnecessaryTimeRanges(timeRanges, availableVisits);

        return days.map((_, i): CalendarColumn<PublicCalendarCell> => {
          const date = Calendar.getDateOfWeekDay(input.weekStartDate, i + 1);
          return getPublicCalendarColumn(date, availableVisits, filteredTimeRanges);
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: UNKNOWN_ERROR_FOR_USER,
          cause: e,
        });
      }
    }),

  getPrivateCalendar: protectedProcedure
    .input(
      z.object({
        weekStartDate: z.date(),
        weekEndDate: z.date(),
      })
    )
    .query(async ({ input, ctx }): Promise<VisitsCalendar<PrivateCalendarCell>> => {
      try {
        const { google_access_token } = ctx.session.user;
        if (!google_access_token) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot access Google Calendar",
          });
        }

        const availableVisits = await prisma.availableVisit.findMany({
          where: {
            dateFrom: {
              gte: input.weekStartDate,
            },
            dateTo: {
              lte: input.weekEndDate,
            },
          },
          include: {
            visitReservation: true,
          },
        });

        const googleCalendarService = new GoogleCalendarService(google_access_token);

        const googleEvents = await googleCalendarService.getEventsWithinDateRange(input.weekStartDate, input.weekEndDate);

        const days = Calendar.getDays();
        const timeRanges = Calendar.getTimeRanges();

        const rawPrivateCellsData = [
          ...googleEvents?.map(
            (event) =>
              ({
                type: "google",
                data: event,
              } as RawPrivateCellData)
          ),
          ...availableVisits.map(
            (visit) =>
              ({
                type: "default",
                data: visit,
              } as RawPrivateCellData)
          ),
        ];

        return days.map((_, i): CalendarColumn<PrivateCalendarCell> => {
          const date = Calendar.getDateOfWeekDay(input.weekStartDate, i + 1);
          return getPrivateCalendarColumn(date, rawPrivateCellsData, timeRanges);
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: UNKNOWN_ERROR_FOR_USER,
          cause: e,
        });
      }
    }),
});
