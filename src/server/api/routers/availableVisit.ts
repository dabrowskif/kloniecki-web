import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";

export const availableVisitRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        dateTo: z.date(),
        dateFrom: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.availableVisit.create({
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
              message: "Ta data wizyty jest już dodana",
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
        await prisma.availableVisit.delete({ where: { id: input.id } });
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
