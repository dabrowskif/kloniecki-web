import { type AvailableVisit, type VisitReservation } from "@prisma/client";
import { type calendar_v3 } from "googleapis";

export interface DateRange<T = Date> {
  from: T;
  to: T;
}

export const DateFormats = {
  DateWithYear: "YYYY-MM-DD",
  DateWithoutYear: "DD-MM",
  HourWithMinutes: "HH:mm",
  GoogleCalendarApi: "YYYY-MM-DD[T]HH:mm:ss[Z]",
};

export type VisitsCalendar<CellType> = CalendarColumn<CellType>[];

export type CalendarColumn<CellType> = {
  day: string;
  date: Date;
  columnCells: CellType[];
};

export type PublicCalendarCell = {
  dateFrom: Date;
  dateTo: Date;
  occupation: "available" | "unavailable";
};

export type RawPrivateCellData =
  | {
      type: "google";
      data: calendar_v3.Schema$Event;
    }
  | {
      type: "default";
      data: AvailableVisit & {
        visitReservation: VisitReservation | null;
      };
    };

export enum PrivateCellOccupation {
  DEFAULT = "DEFAULT",
  GOOGLE_EVENT = "GOOGLE_EVENT",
  NONE = "NONE",
}

export type PrivateCalendarCell = {
  dateFrom: Date;
  dateTo: Date;
} & (
  | {
      occupation: PrivateCellOccupation.NONE;
      data?: never;
    }
  | {
      occupation: PrivateCellOccupation.DEFAULT;
      data: AvailableVisit & {
        visitReservation: VisitReservation | null;
      };
    }
  | {
      occupation: PrivateCellOccupation.GOOGLE_EVENT;
      data: {
        name?: string | null;
        description?: string;
      };
    }
);

export type TimeRange = {
  from: string;
  to: string;
};
