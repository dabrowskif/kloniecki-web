import { type AvailableVisit, type VisitReservation } from "@prisma/client";
import { Calendar } from "~/utils/calendar";
import {
  type TimeRange,
  type CalendarColumn,
  type PrivateCalendarCell,
} from "~/utils/calendar/types";

export const getPrivateCalendarColumn = (
  date: Date,
  availableVisits: (AvailableVisit & {
    visitReservation: VisitReservation | null;
  })[],
  timeRanges: TimeRange[]
): CalendarColumn<PrivateCalendarCell> => {
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
): PrivateCalendarCell => {
  const dateFrom = Calendar.addTimeToDate(date, timeRange.from);
  const dateTo = Calendar.addTimeToDate(date, timeRange.to);

  const availableVisit = availableVisits.find(
    (visit) =>
      Calendar.areDatesEqual(visit.dateFrom, date, "day") &&
      Calendar.getHourOfDate(visit.dateFrom) === timeRange.from
  );
  // console.log(availableVisit?.visitReservation.)

  return {
    availableVisitId: availableVisit?.id,
    dateFrom: dateFrom,
    dateTo: dateTo,

    occupation: availableVisit?.visitReservation
      ? "reserved"
      : availableVisit
      ? "available"
      : "unavailable",
  };
};
