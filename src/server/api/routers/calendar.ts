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
  EOccupation,
  type CalendarColumn,
  type DetailedTimeRange,
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

        return days.map((_, i): CalendarColumn => {
          const date = Calendar.getDateOfWeekDay(input.weekStartDate, i + 1);
          const day = days[i] as string;
          const timeRanges = Calendar.getTimeRanges();

          const detailedTimeRanges = timeRanges.map(
            (timeRange): DetailedTimeRange => {
              const availableVisit = visits.find(
                (visit) =>
                  Calendar.areDatesEqual(visit.dateFrom, date, "day") &&
                  Calendar.getHourOfDate(visit.dateFrom) === timeRange.from &&
                  !visit.visitReservation
              );

              if (availableVisit) {
                return {
                  id: availableVisit.id,
                  from: timeRange.from,
                  to: timeRange.to,
                  occupation: EOccupation.Available as unknown as Pick<
                    typeof EOccupation,
                    "Available"
                  >,
                };
              } else {
                return {
                  from: timeRange.from,
                  to: timeRange.to,
                  occupation: EOccupation.Reserved as unknown as Pick<
                    typeof EOccupation,
                    "Private_event" | "Reserved"
                  >,
                };
              }
            }
          );
          return {
            date,
            day,
            detailedTimeRanges,
          };
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
