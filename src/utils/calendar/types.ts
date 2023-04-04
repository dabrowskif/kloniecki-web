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
  detailedTimeRanges: DetailedTimeRange[];
};

export type DetailedTimeRange =
  | {
      id: string;
      from: string;
      to: string;
      occupation: Pick<typeof EOccupation, "Available">;
    }
  | {
      from: string;
      to: string;
      occupation: Pick<typeof EOccupation, "Private_event" | "Reserved">;
    };

export const EOccupation = {
  Available: "available",
  Reserved: "reserved",
  Private_event: "private_event",
};
