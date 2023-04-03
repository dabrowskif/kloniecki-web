/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nodemailer from "nodemailer";
// @ts-expect-error - no type provided
import sendinblueTransport from "nodemailer-sendinblue-transport";
import { env } from "~/env.mjs";

type MailOptions = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
};

class MailService {
  private readonly mailClient;

  constructor() {
    this.mailClient = nodemailer.createTransport(
      new sendinblueTransport({
        apiKey: env.SENDINBLUE_API_KEY,
      })
    );
  }

  public async sendMail(options: MailOptions) {
    try {
      await this.mailClient.sendMail(options);
    } catch (error) {
      throw new MailServiceError(
        "There was an error while sending an email. Please try again later.",
        { error }
      );
    }
  }
}

const mailService = new MailService();
export const useMailService = () => mailService;

class MailServiceError extends Error {
  private statusCode: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, props?: { error?: any; statusCode?: number }) {
    super(message);
    this.name = "❌ EmailServiceError ❌";
    this.statusCode = props?.statusCode || 500;
    if (props?.error) {
      this.stack = props?.error.stack;
    }
  }
}
