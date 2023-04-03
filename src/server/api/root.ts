import { createTRPCRouter } from "~/server/api/trpc";
import { availableVisitDateRouter } from "./routers/availableVisitDate";
import { inquiryFormRouter } from "./routers/inquiryForm";
import { mailerRouter } from "./routers/mailer";
import { visitReservationRouter } from "./routers/visitReservation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // mailer: mailerRouter,
  inquiryForm: inquiryFormRouter,
  availableVisitDate: availableVisitDateRouter,
  visitReservation: visitReservationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
