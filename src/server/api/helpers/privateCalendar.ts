import { Calendar } from "~/utils/calendar";
import {
  type TimeRange,
  type CalendarColumn,
  type PrivateCalendarCell,
  type RawPrivateCellData,
  PrivateCellOccupation,
} from "~/utils/calendar/types";

export const getPrivateCalendarColumn = (
  date: Date,
  rawCells: RawPrivateCellData[],
  timeRanges: TimeRange[]
): CalendarColumn<PrivateCalendarCell> => {
  const day = Calendar.getDay(date);

  const columnCells = timeRanges.map((timeRange) => getColumnCell(timeRange, date, rawCells));

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
  rawCells: RawPrivateCellData[]
): PrivateCalendarCell => {
  const dateFrom = Calendar.addTimeToDate(date, timeRange.from);
  const dateTo = Calendar.addTimeToDate(date, timeRange.to);

  const availableVisit = rawCells.find((rawCell) => {
    if (rawCell.type === "default") {
      return (
        Calendar.areDatesEqual(rawCell.data.dateFrom, date, "day") &&
        Calendar.getHourOfDate(new Date(rawCell.data.dateFrom)) === timeRange.from
      );
    }
    if (rawCell.type === "google" && rawCell.data.start?.dateTime) {
      return (
        Calendar.areDatesEqual(new Date(rawCell.data.start.dateTime), date, "day") &&
        Calendar.getHourOfDate(new Date(rawCell.data.start.dateTime)) === timeRange.from
      );
    }
    return false;
  });

  if (!availableVisit) {
    return {
      dateFrom,
      dateTo,
      occupation: PrivateCellOccupation.NONE,
    };
  } else {
    if (availableVisit.type === "default") {
      return {
        dateFrom,
        dateTo,
        data: availableVisit.data,
        occupation: PrivateCellOccupation.DEFAULT,
      };
    } else {
      return {
        dateFrom,
        dateTo,
        data: {
          name: availableVisit.data.summary,
        },
        occupation: PrivateCellOccupation.GOOGLE_EVENT,
      };
    }
  }
};
