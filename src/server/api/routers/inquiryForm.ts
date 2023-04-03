import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { useMailService } from "~/server/lib/nodemailer";

export const inquiryFormRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string(),
        phoneNumber: z.string().optional(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const mailService = useMailService();

      await prisma.inquiryForm
        .create({
          data: {
            email: input.email,
            phoneNumber: input.phoneNumber,
            message: input.message,
          },
        })
        .catch((e: unknown) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Wystąpił nieoczekiwany błąd",
          });
        });

      await mailService
        .sendMail({
          to: "filip.daabrowski@gmail.com",
          from: "KlonieckiWeb filip.dabrowski@protonmail.com",
          subject: `Nowe zapytanie od ${input.email}`,
          text: `Otrzymałeś nowe zapytanie od ${input.email}  Numer telefonu:${
            input.phoneNumber ? input.phoneNumber : ""
          } Wiadomość: ${input.message} `,
          html: `Otrzymałeś nowe zapytanie od <a href="mailto:${input.email}">${
            input.email
          }</a> <br /> Numer telefonu: ${
            input.phoneNumber ? input.phoneNumber : ""
          } <br/> <br /> ${input.message} `,
        })
        .catch((e) => console.log(e));
    }),
});
