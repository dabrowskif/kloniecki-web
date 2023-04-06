import { type AvailableVisit, type VisitReservation } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";
import { Calendar } from "~/utils/calendar";
import {
  type VisitsCalendar,
  type CalendarColumn,
  type ColumnCell,
  type TimeRange,
} from "~/utils/calendar/types";
import { getPrivateCalendarColumn } from "../helpers/privateCalendar";
import { getPublicCalendarColumn } from "../helpers/publicCalendar";

export const calendarRouter = createTRPCRouter({
  getPublicCalendar: publicProcedure
    .input(
      z.object({
        weekStartDate: z.date(),
        weekEndDate: z.date(),
      })
    )
    .query(async ({ input }): Promise<VisitsCalendar> => {
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
        const filteredTimeRanges = Calendar.removeUnnecessaryTimeRanges(
          timeRanges,
          availableVisits
        );

        return days.map((_, i): CalendarColumn => {
          const date = Calendar.getDateOfWeekDay(input.weekStartDate, i + 1);
          return getPublicCalendarColumn(
            date,
            availableVisits,
            filteredTimeRanges
          );
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
    .query(async ({ input, ctx }): Promise<VisitsCalendar> => {
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

        return days.map((_, i): CalendarColumn => {
          const date = Calendar.getDateOfWeekDay(input.weekStartDate, i + 1);
          return getPrivateCalendarColumn(date, availableVisits, timeRanges);
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
