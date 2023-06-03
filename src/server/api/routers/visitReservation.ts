import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";
import { useMailService } from "~/server/lib/nodemailer";
import { Calendar } from "~/utils/calendar";
import { generateRandomToken } from "~/utils/crypto";

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
        .catch((e) => {
          console.log(e);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: UNKNOWN_ERROR_FOR_USER,
            cause: e,
          });
        });

      if (!availableVisitDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Termin wizyty nie jest już dostępny.",
        });
      }

      const confirmationToken = generateRandomToken(64);

      await prisma.visitReservation
        .create({
          data: {
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            message: input.message,
            customerConfirmationToken: confirmationToken,
            availableVisit: {
              connect: {
                id: availableVisitDate.id,
              },
            },
          },
        })
        .catch((e) => {
          console.log(e);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: UNKNOWN_ERROR_FOR_USER,
            cause: e,
          });
        });

      await mailService
        .sendMail({
          to: input.email,
          subject: `Prośba o potwierdzenie wizyty`,
          html: `
          <p>Szanowna/y Pani/Panie</p>
          <p>Dziękuję za rezerwację wizyty.</p>
          <p>Prosiłbym o potwierdzenie wyzyty klikając w poniższy link.</p>
          <a href="">Potwierdź</a>
          <br />
          <a href="">Odwołaj</a>
          <br />
          <p>Z poważaniem,</p>
          <p>Szymon Kloniecki</p>
          `,
        })
        .catch((e) => console.log(e));

      await mailService
        .sendMail({
          to: env.OWNER_EMAIL,
          subject: `Nowe rezerwacja - ${input.email}`,
          html: `
          <p>Nowa rezerwacja</p>
          <p>Adres email: ${input.email}</p>
          <p>Imię i nazwisko: ${input.name}</p>
          <p>Data: ${Calendar.formatDate(input.dateFrom, "DateWithYear")} od ${Calendar.formatDate(input.dateFrom, "HourWithMinutes")} do 
          ${Calendar.formatDate(input.dateTo, "HourWithMinutes")}
          </p>
          <p>Numer telefonu: ${input.phoneNumber ? input.phoneNumber : "brak"}</p>
          <p>Wiadomość: ${input?.message ? input.message : "brak"}</p>
          `,
        })
        .catch((e) => console.log(e));
    }),
  changeUserConfirmationByToken: publicProcedure
    .input(
      z.object({
        confirmationToken: z.string(),
        shouldConfirm: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const confirmationStatus = input.shouldConfirm ? "CONFIRMED" : "CANCELED";

      await prisma.visitReservation
        .update({
          where: {
            customerConfirmationToken: input.confirmationToken,
          },
          data: {
            customerConfirmationStatus: confirmationStatus,
          },
        })
        .catch((e) => {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2025") {
              throw new TRPCError({ code: "BAD_REQUEST", message: "Nieprawidłowy token potwierdzający." });
            }
          }
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: UNKNOWN_ERROR_FOR_USER,
            cause: e,
          });
        });
    }),
  changeOwnerConfirmationById: publicProcedure
    .input(
      z.object({
        visitReservationId: z.string(),
        shouldConfirm: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const confirmationStatus = input.shouldConfirm ? "CONFIRMED" : "CANCELED";
      try {
        await prisma.visitReservation.update({
          where: {
            id: input.visitReservationId,
          },
          data: {
            customerConfirmationStatus: confirmationStatus,
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: UNKNOWN_ERROR_FOR_USER,
          cause: e,
        });
      }
    }),
});
