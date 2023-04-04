import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";

export const availableVisitDateRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        dateTo: z.date(),
        dateFrom: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.availableVisitDate.create({
          data: {
            dateFrom: input.dateFrom,
            dateTo: input.dateTo,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Ta data wizyty jest ju dodana",
              cause: e,
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: UNKNOWN_ERROR_FOR_USER,
          cause: e,
        });
      }
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.availableVisitDate.delete({ where: { id: input.id } });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: UNKNOWN_ERROR_FOR_USER,
          cause: e,
        });
      }
    }),
  // findMany: publicProcedure
  //   .input(
  //     z.object({
  //       dateFrom: z.date(),
  //       dateTo: z.date(),
  //     })
  //   )
  //   .query(async ({ input }) => {
  //     try {
  //       const availableVisitDates = await prisma.availableVisitDate.findMany({
  //         where: {
  //           dateFrom: {
  //             gte: new Date(dateFrom),
  //             lte: new Date(dateTo),
  //           },
  //           visitReservation: input.shouldIncludeReservedDates ? {} : null,
  //         },
  //         select: {
  //           date: true,
  //           from: true,
  //           id: true,
  //           to: true,
  //           visitReservation: {
  //             select: {
  //               id: true,
  //             },
  //           },
  //         },
  //       });

  //       return availableVisitDates.map((visitDate) => {
  //         return {
  //           ...visitDate,
  //           date: dayjs(visitDate.date).format(DateFormats.DateFormatWithYear),
  //         };
  //       });
  //     } catch (e) {
  //       console.log(e);
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Wystąpił nieoczekiwany błąd",
  //       });
  //     }
  //   }),
});
