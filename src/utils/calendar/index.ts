import dayjs from "dayjs";
import "dayjs/locale/pl";
import { DateFormats } from "./types";
dayjs.locale("pl");

export class Calendar {
  static getDays = () => {
    return ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];
  };

  static getTimeRanges = () => {
    const startTime = 8;
    const endTime = 17.5;
    const interval = 0.5;
    const availableTimes = [];

    for (let i = startTime; i < endTime; i += interval) {
      availableTimes.push({
        from: `${Math.floor(i)}:${i % 1 === 0.5 ? "30" : "00"}`,
        to: `${Math.floor(i + interval)}:${i % 1 === 0 ? "30" : "00"}`,
      });
    }

    return availableTimes;
  };

  static getHourOfDate = (date: Date) => {
    return dayjs(date).format("HH:mm");
  };

  static addTimeToDate = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":");
    return dayjs(date)
      .add(+(hours ?? 0), "hours")
      .add(+(minutes ?? 0), "minutes")
      .toDate();
  };

  static getDay = (date: Date) => {
    return dayjs(date).format("dddd");
  };

  static getDateOfWeekDay = (week: Date, day: number) => {
    return dayjs(week).day(day).toDate();
  };

  static formatDate = (date: Date, format: keyof typeof DateFormats) => {
    return dayjs(date).format(DateFormats[format]);
  };

  static isPastDate = (date: Date) => {
    return dayjs(date).isBefore(dayjs(), "day");
  };

  static areDatesEqual = (
    date1: Date,
    date2: Date,
    precision: "minute" | "day"
  ) => {
    return dayjs(date1).isSame(dayjs(date2), precision);
  };

  static getWeekStartDate = () => {
    return dayjs().startOf("week").toDate();
  };

  static getWeekEndDate = () => {
    return dayjs().endOf("week").toDate();
  };

  static changeWeek = (currentWeek: Date, weekOffset: number) => {
    return dayjs(currentWeek).add(weekOffset, "week").startOf("week").toDate();
  };

  // static getMinAndMaxTimeRanges = (timeRanges: DateRange[]) => {
  //   let minTimeRange = 2400;
  //   let maxTimeRange = 0;

  //   for (const range of timeRanges) {
  //     const { from, to } = Calendar.timeRangeToNumber(range);
  //     from < minTimeRange ? (minTimeRange = from) : undefined;
  //     to > maxTimeRange ? (maxTimeRange = to) : undefined;
  //   }

  //   return { minTimeRange, maxTimeRange };
  // };

  // static filterUnnecessaryTimeRanges = (
  //   currentTimeRanges: DateRange[],
  //   allTimeRanges: DateRange[]
  // ): DateRange[] => {
  //   const necessaryTimeRanges: DateRange[] = [];

  //   const { minTimeRange, maxTimeRange } =
  //     Calendar.getMinAndMaxTimeRanges(currentTimeRanges);

  //   for (const timeRange of allTimeRanges) {
  //     const { from, to } = Calendar.timeRangeToNumber(timeRange);
  //     if (from >= minTimeRange && to <= maxTimeRange) {
  //       necessaryTimeRanges.push(timeRange);
  //     }
  //   }

  //   return necessaryTimeRanges;
  // };

  // private static timeRangeToNumber = (timeRange: DateRange<string>) => {
  //   return {
  //     from: +timeRange.from.split(":").join(""),
  //     to: +timeRange.to.split(":").join(""),
  //   };
  // };
}
