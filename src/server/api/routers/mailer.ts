import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { useMailService } from "~/server/lib/nodemailer";

export const mailerRouter = createTRPCRouter({
  sendContactFormMail: publicProcedure
    .input(
      z.object({
        email: z.string(),
        phoneNumber: z.string().optional(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const mailService = useMailService();
      await mailService.sendMail({
        to: "filip@podhash.com",
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
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
