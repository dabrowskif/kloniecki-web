import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";

export const calendarRouter = createTRPCRouter({
  getPublicCalendar: publicProcedure
    .input(
      z.object({
        dateFrom: z.date(),
        dateTo: z.date(),
      })
    )
    .query(async ({ input }) => {
      try {
        const availableVisitDates = await prisma.availableVisitDate.findMany({
          where: {
            dateFrom: {
              gte: input.dateFrom,
            },
            dateTo: {
              lte: input.dateTo,
            },
          },
          include: {
            visitReservation: true,
          },
        });

        return availableVisitDates
          .filter((date) => !date.visitReservation)
          .map((date) => ({
            id: date.id,
            dateFrom: date.dateFrom,
            dateTo: date.dateTo,
          }));
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
