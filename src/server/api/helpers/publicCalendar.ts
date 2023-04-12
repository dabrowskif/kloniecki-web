import { type AvailableVisit, type VisitReservation } from "@prisma/client";
import { Calendar } from "~/utils/calendar";
import {
  type TimeRange,
  type CalendarColumn,
  type PublicCalendarCell,
} from "~/utils/calendar/types";

export const getPublicCalendarColumn = (
  date: Date,
  availableVisits: (AvailableVisit & {
    visitReservation: VisitReservation | null;
  })[],
  timeRanges: TimeRange[]
): CalendarColumn<PublicCalendarCell> => {
  const day = Calendar.getDay(date);
  const columnCells = timeRanges.map((timeRange) =>
    getColumnCell(timeRange, date, availableVisits)
  );

  return {
    date,
    day,
    columnCells,
  };
};

const getColumnCell = (
  timeRange: {
    from: string;
    to: string;
  },
  date: Date,
  availableVisits: (AvailableVisit & {
    visitReservation: VisitReservation | null;
  })[]
): PublicCalendarCell => {
  const dateFrom = Calendar.addTimeToDate(date, timeRange.from);
  const dateTo = Calendar.addTimeToDate(date, timeRange.to);

  const availableVisit = availableVisits.find(
    (visit) =>
      Calendar.areDatesEqual(visit.dateFrom, date, "day") &&
      Calendar.getHourOfDate(visit.dateFrom) === timeRange.from
  );

  return {
    dateFrom: dateFrom,
    dateTo: dateTo,
    occupation:
      availableVisit?.visitReservation || !availableVisit
        ? "unavailable"
        : "available",
  };
};
