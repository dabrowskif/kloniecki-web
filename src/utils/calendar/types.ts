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

export type ColumnCell = {
  dateFrom: Date;
  dateTo: Date;
  occupation: "available" | "reserved";
};
