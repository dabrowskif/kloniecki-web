import dayjs from "./dayjs";

export type Day = "Poniedziałek" | "Wtorek" | "Środa" | "Czwartek" | "Piątek";

export interface TimeRange {
  from: string;
  to: string;
}

export type DateWithTime = { date: string } & TimeRange;

export const daysOfWeek: Day[] = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
];

export const timeRanges: TimeRange[] = [
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

export const filterUnnecessaryTimeRanges = (
  currentTimeRanges: TimeRange[],
  allTimeRanges: TimeRange[]
): TimeRange[] => {
  const necessaryTimeRanges: TimeRange[] = [];

  const { minTimeRange, maxTimeRange } =
    getMinAndMaxTimeRanges(currentTimeRanges);

  for (const timeRange of allTimeRanges) {
    const { from, to } = timeRangeToNumber(timeRange);
    if (from >= minTimeRange && to <= maxTimeRange) {
      necessaryTimeRanges.push(timeRange);
    }
  }

  return necessaryTimeRanges;
};

const timeRangeToNumber = (timeRange: TimeRange) => {
  return {
    from: +timeRange.from.split(":").join(""),
    to: +timeRange.to.split(":").join(""),
  };
};

const getMinAndMaxTimeRanges = (timeRanges: TimeRange[]) => {
  let minTimeRange = 2400;
  let maxTimeRange = 0;

  for (const range of timeRanges) {
    const { from, to } = timeRangeToNumber(range);
    from < minTimeRange ? (minTimeRange = from) : undefined;
    to > maxTimeRange ? (maxTimeRange = to) : undefined;
  }

  return { minTimeRange, maxTimeRange };
};

export const areDatesEqual = (date1: DateWithTime, date2: DateWithTime) => {
  date1.date === date2.date &&
    date1.from === date2.from &&
    date1.to === date2.to;
};

export const isPastDate = (date: DateWithTime) => {
  const now = dayjs(new Date()).toDate();
  const _date = dayjs(date.date).toDate();
  return now > _date;
};
