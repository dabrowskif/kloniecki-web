import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";
import { useMailService } from "~/server/lib/nodemailer";
import { Calendar } from "~/utils/calendar";

export const visitReservationRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string(),
        phoneNumber: z.string(),
        message: z.string().optional(),
        name: z.string(),
        dateFrom: z.date(),
        dateTo: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const mailService = useMailService();

      const availableVisitDate = await prisma.availableVisit
        .findFirst({
          where: {
            dateFrom: input.dateFrom,
            dateTo: input.dateTo,
            visitReservation: null,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: UNKNOWN_ERROR_FOR_USER,
          });
        });

      if (!availableVisitDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Termin wizyty nie jest już dostępny.",
        });
      }

      await prisma.visitReservation
        .create({
          data: {
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            message: input.message,
            availableVisit: {
              connect: {
                id: availableVisitDate.id,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: UNKNOWN_ERROR_FOR_USER,
          });
        });

      await mailService
        .sendMail({
          to: "filip.daabrowski@gmail.com",
          from: "Kloniecki Osteopatia filip.dabrowski@protonmail.com",
          subject: `Nowe rezerwacja - ${input.email}`,
          html: `
          <p>Nowa rezerwacja</p>
          <p>Adres email: ${input.email}</p>
          <p>Imię i nazwisko: ${input.name}</p>
          <p>Data: ${Calendar.formatDate(
            input.dateFrom,
            "DateWithYear"
          )} od ${Calendar.formatDate(input.dateFrom, "HourWithMinutes")} do 
            ${Calendar.formatDate(input.dateTo, "HourWithMinutes")}
          </p>
          <p>Numer telefonu: ${
            input.phoneNumber ? input.phoneNumber : "brak"
          }</p>
          <p>Wiadomość: ${input?.message ? input.message : "brak"}</p>
        `,
        })
        .catch((e) => console.log(e));
    }),
});
