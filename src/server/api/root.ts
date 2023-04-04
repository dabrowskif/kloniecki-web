import { createTRPCRouter } from "~/server/api/trpc";
import { availableVisitDateRouter } from "./routers/availableVisitDate";
import { calendarRouter } from "./routers/calendar";
import { inquiryFormRouter } from "./routers/inquiryForm";
import { visitReservationRouter } from "./routers/visitReservation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  inquiryForm: inquiryFormRouter,
  availableVisitDate: availableVisitDateRouter,
  visitReservation: visitReservationRouter,
  calendar: calendarRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
