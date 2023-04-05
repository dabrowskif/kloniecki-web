export interface DateRange<T = Date> {
  from: T;
  to: T;
}

export const DateFormats = {
  DateWithYear: "YYYY-MM-DD",
  DateWithoutYear: "DD-MM",
  HourWithMinutes: "HH:MM",
  GoogleCalendarApi: "YYYY-MM-DD[T]HH:mm:ss[Z]",
};

export type VisitsCalendar = CalendarColumn[];

export type CalendarColumn = {
  day: string;
  date: Date;
  columnCells: ColumnCell[];
};

export type ColumnCell =
  | {
      id: string;
      from: string;
      to: string;
      occupation: "available";
    }
  | {
      from: string;
      to: string;
      occupation: "private_event" | "reserved";
    };
