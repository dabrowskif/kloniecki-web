import { type Visit, type VisitReservation } from "@prisma/client";
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
} from "~/utils/calendar/types";

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
        const visits = await prisma.visit.findMany({
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

        return days.map(
          (_, i): CalendarColumn =>
            getCalendarColumn(i, input.weekStartDate, visits)
        );
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
        const visits = await prisma.visit.findMany({
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

        return days.map(
          (_, i): CalendarColumn =>
            getCalendarColumn(i, input.weekStartDate, visits)
        );
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

const getCalendarColumn = (
  dayIndex: number,
  weekStartDate: Date,
  visits: (Visit & {
    visitReservation: VisitReservation | null;
  })[]
): CalendarColumn => {
  const date = Calendar.getDateOfWeekDay(weekStartDate, dayIndex + 1);
  const day = Calendar.getDay(date);
  const timeRanges = Calendar.getTimeRanges();

  const columnCells = timeRanges.map((timeRange) =>
    getColumnCell(timeRange, date, visits)
  );

  return {
    date,
    day,
    columnCells,
  };
};

const getColumnCell = (
  timeRange: {
    from: string;
    to: string;
  },
  date: Date,
  visits: (Visit & {
    visitReservation: VisitReservation | null;
  })[]
): ColumnCell => {
  const dateFrom = Calendar.addTimeToDate(date, timeRange.from);
  const dateTo = Calendar.addTimeToDate(date, timeRange.to);
  const availableVisit = visits.find(
    (visit) =>
      Calendar.areDatesEqual(visit.dateFrom, date, "day") &&
      Calendar.getHourOfDate(visit.dateFrom) === timeRange.from &&
      !visit.visitReservation
  );

  return {
    dateFrom: dateFrom,
    dateTo: dateTo,
    occupation: availableVisit ? "reserved" : "available",
  };
};
