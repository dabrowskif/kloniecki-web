export const DateFormats = {
  DateWithYear: "YYYY-MM-DD",
  DateWithoutYear: "DD-MM",
  HourWithMinutes: "HH:MM",
  GoogleCalendarApi: "YYYY-MM-DD[T]HH:mm:ss[Z]",
};

export interface DateRange<T = Date> {
  from: T;
  to: T;
}

export const availableTimeRanges: DateRange<string>[] = [
  {
    from: "8:30",
    to: "9:00",
  },
  {
    from: "9:00",
    to: "9:30",
  },
  {
    from: "9:30",
    to: "10:00",
  },
  {
    from: "10:00",
    to: "10:30",
  },
  {
    from: "10:30",
    to: "11:00",
  },
  {
    from: "11:00",
    to: "11:30",
  },
  {
    from: "11:30",
    to: "12:00",
  },
  {
    from: "12:00",
    to: "12:30",
  },
  {
    from: "12:30",
    to: "13:00",
  },
  {
    from: "13:00",
    to: "13:30",
  },
  {
    from: "13:30",
    to: "14:00",
  },
  {
    from: "14:00",
    to: "14:30",
  },
  {
    from: "14:30",
    to: "15:00",
  },
  {
    from: "15:00",
    to: "15:30",
  },
  {
    from: "15:30",
    to: "16:00",
  },
  {
    from: "16:00",
    to: "16:30",
  },
  {
    from: "16:30",
    to: "17:00",
  },
  {
    from: "17:00",
    to: "17:30",
  },
];
