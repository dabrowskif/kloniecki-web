import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import dayjs, { DateFormats } from "~/utils/dayjs";

export const availableVisitDateRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        date: z.string(),
        from: z.string(),
        to: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const date = dayjs(input.date, DateFormats.DateFormatWithYear).toDate();
      try {
        await prisma.availableVisitDate.create({
          data: {
            date,
            from: input.from,
            to: input.to,
          },
        });
      } catch (e) {
        console.log(e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Ta data wizyty jest ju dodana",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Wystąpił nieoczekiwany błąd",
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
          message: "Wystąpił nieoczekiwany błąd",
        });
      }
    }),
  findMany: publicProcedure
    .input(
      z.object({
        dateFrom: z.string(),
        dateTo: z.string(),
        shouldIncludeReservedDates: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const dateFrom = dayjs(
        input.dateFrom,
        DateFormats.DateFormatWithYear
      ).toDate();

      const dateTo = dayjs(
        input.dateTo,
        DateFormats.DateFormatWithYear
      ).toDate();

      try {
        const availableVisitDates = await prisma.availableVisitDate.findMany({
          where: {
            date: {
              gte: new Date(dateFrom),
              lte: new Date(dateTo),
            },
            visitReservation: input.shouldIncludeReservedDates ? {} : null,
          },
          select: {
            date: true,
            from: true,
            id: true,
            to: true,
            visitReservation: {
              select: {
                id: true,
              },
            },
          },
        });

        return availableVisitDates.map((visitDate) => {
          return {
            ...visitDate,
            date: dayjs(visitDate.date).format(DateFormats.DateFormatWithYear),
          };
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Wystąpił nieoczekiwany błąd",
        });
      }
    }),
});
