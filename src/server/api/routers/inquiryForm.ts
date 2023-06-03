import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UNKNOWN_ERROR_FOR_USER } from "~/server/lib/errorMessages";
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
          to: env.OWNER_EMAIL,
          subject: `Nowe zapytanie od ${input.email}`,
          text: `Otrzymałeś nowe zapytanie od ${input.email}  Numer telefonu:${input.phoneNumber ? input.phoneNumber : ""} Wiadomość: ${
            input.message
          } `,
          html: `Otrzymałeś nowe zapytanie od <a href="mailto:${input.email}">${input.email}</a> <br /> Numer telefonu: ${
            input.phoneNumber ? input.phoneNumber : ""
          } <br/> <br /> ${input.message} `,
        })
        .catch((e) => console.log(e));
    }),
});
