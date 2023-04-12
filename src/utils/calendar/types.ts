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

export type PrivateCalendarCell =
  | ({
      dateFrom: Date;
      dateTo: Date;
    } & {
      occupation: "available" | "unconfirmed" | "confirmed";
      availableVisitId?: string;
    })
  | {
      occupation: "google_event";
      googleEvent: {
        name: string;
        description: string;
      };
    };

// export type CalendarCell = {
//   dateFrom: Date;
//   dateTo: Date;
// } & (
//   | {
//       occupation: "available" | "unavailable" | "reserved";
//       availableVisitId?: string;
//       googleEvent?: never;
//     }
//   | {
//       occupation: "google_event";
//       availableVisitId?: never;
//     }
// );

export type TimeRange = {
  from: string;
  to: string;
};
