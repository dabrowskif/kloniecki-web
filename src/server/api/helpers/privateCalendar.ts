import { type AvailableVisit, type VisitReservation } from "@prisma/client";
import { Calendar } from "~/utils/calendar";
import {
  type TimeRange,
  type CalendarColumn,
  type PrivateCalendarCell,
  type PrivateRawCell,
} from "~/utils/calendar/types";

export const getPrivateCalendarColumn = (
  date: Date,
  rawCells: PrivateRawCell[],
  timeRanges: TimeRange[]
): CalendarColumn<PrivateCalendarCell> => {
  const day = Calendar.getDay(date);

  const columnCells = timeRanges.map((timeRange) =>
    getColumnCell(timeRange, date, rawCells)
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
  rawCells: PrivateRawCell[]
): PrivateCalendarCell => {
  const dateFrom = Calendar.addTimeToDate(date, timeRange.from);
  const dateTo = Calendar.addTimeToDate(date, timeRange.to);

  const availableVisit = rawCells.find((rawCell) => {
    if (rawCell.type === "default") {
      return (
        Calendar.areDatesEqual(rawCell.data.dateFrom, date, "day") &&
        Calendar.getHourOfDate(new Date(rawCell.data.dateFrom)) ===
          timeRange.from
      );
    }
    if (rawCell.type === "google" && rawCell.data.start?.dateTime) {
      // console.log(new Date(rawCell.data.start.dateTime))
      // console.log()
      return (
        Calendar.areDatesEqual(
          new Date(rawCell.data.start.dateTime),
          date,
          "day"
        ) &&
        Calendar.getHourOfDate(new Date(rawCell.data.start.dateTime)) ===
          timeRange.from
      );
    }
    return false;
  });

  if (!availableVisit) {
    return {
      dateFrom,
      dateTo,
      occupation: "none",
    };
  } else {
    if (availableVisit.type === "default") {
      return {
        availableVisitId: availableVisit.data.id,
        dateFrom,
        dateTo,
        occupation: !availableVisit.data.visitReservation
          ? "available"
          : availableVisit.data.visitReservation.confirmedByCustomer
          ? "confirmed"
          : "unconfirmed",
      };
    } else {
      return {
        dateFrom,
        dateTo,
        googleEvent: {
          name: availableVisit.data.summary ?? "",
        },
        occupation: "google_event",
      };
    }
  }
};
