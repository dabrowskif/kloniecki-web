import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";
import { useMailService } from "~/server/lib/nodemailer";
import dayjs, { DateFormats } from "~/utils/dayjs";

const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const visitReservationRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string(),
        phoneNumber: z.string(),
        message: z.string().optional(),
        name: z.string(),
        date: z.object({
          date: z
            .string()
            .regex(dateRegex, "Invalid date format. Should be YYYY-MM-DD"),
          from: z
            .string()
            .regex(timeRegex, "Invalid time format. Should be HH:mm"),
          to: z
            .string()
            .regex(timeRegex, "Invalid time format. Should be HH:mm"),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const mailService = useMailService();
      const date = dayjs(
        input.date.date,
        DateFormats.DateFormatWithYear
      ).toDate();

      const availableVisitDate = await prisma.availableVisitDate
        .findFirst({
          where: {
            date,
            from: input.date.from,
            to: input.date.to,
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
          message: "Termin wizyty nie jest juz dostępny.",
        });
      }

      await prisma.visitReservation
        .create({
          data: {
            date,
            from: input.date.from,
            to: input.date.to,
            name: input.name,
            email: input.email,
            confirmedByCustomer: false,
            confirmedByOwner: false,
            phoneNumber: input.phoneNumber,
            message: input.message,
            availableVisitDate: {
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
          text: `
          <p>Nowa rezerwacja</p>
          <p>Adres email: ${input.email}</p>
          <p>Imię i nazwisko: ${input.name}</p>
          <p>Data: ${input.date.date} od ${input.date.from} do ${
            input.date.to
          }</p>
          <p>Numer telefonu: ${
            input.phoneNumber ? input.phoneNumber : "brak"
          }</p>
          <p>Wiadomość: ${input?.message ? input.message : "brak"}</p>
        `,
          html: `
          <p>Nowa rezerwacja</p>
          <p>Adres email: ${input.email}</p>
          <p>Imię i nazwisko: ${input.name}</p>
          <p>Data: ${input.date.date} od ${input.date.from} do ${
            input.date.to
          }</p>
          <p>Numer telefonu: ${
            input.phoneNumber ? input.phoneNumber : "brak"
          }</p>
          <p>Wiadomość: ${input?.message ? input.message : "brak"}</p>
        `,
        })
        .catch((e) => console.log(e));
    }),
});
