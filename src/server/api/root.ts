import { createTRPCRouter } from "~/server/api/trpc";
import { availableVisitRouter } from "./routers/availableVisit";
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
  availableVisit: availableVisitRouter,
  visitReservation: visitReservationRouter,
  calendar: calendarRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
