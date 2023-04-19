import { type AvailableVisit, type VisitReservation } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { DateFormats, type TimeRange } from "./types";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pl");
dayjs.tz.setDefault("Europe/Warsaw");

export class Calendar {
  static getDays = () => {
    return ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];
  };

  static getTimeRanges = (): TimeRange[] => {
    const startTime = 8;
    const endTime = 17.5;
    const interval = 0.5;
    const timeRanges = [];

    for (let i = startTime; i < endTime; i += interval) {
      const fromHour = i < 10 ? `0${Math.floor(i)}` : `${Math.floor(i)}`;
      const toHour = i + interval < 10 ? `0${Math.floor(i + interval)}` : `${Math.floor(i + interval)}`;
      timeRanges.push({
        from: `${fromHour}:${i % 1 === 0.5 ? "30" : "00"}`,
        to: `${toHour}:${i % 1 === 0 ? "30" : "00"}`,
      });
    }

    return timeRanges;
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

  static compareDates = (firstDate: Date, secondDate: Date) => {
    return dayjs(firstDate).diff(secondDate, "ms");
  };

  static getDateOfWeekDay = (weekStartDate: Date, day: number) => {
    return dayjs(weekStartDate).day(day).toDate();
  };

  static formatDate = (date: Date, format: keyof typeof DateFormats) => {
    return dayjs(date).format(DateFormats[format]);
  };

  static isPastDate = (date: Date) => {
    return dayjs(date).isBefore(dayjs(), "day");
  };

  static areDatesEqual = (date1: Date, date2: Date, precision: "minute" | "day") => {
    return dayjs(date1).isSame(dayjs(date2), precision);
  };

  static getWeekStartDate = () => {
    return dayjs().startOf("week").toDate();
  };

  static getWeekEndDate = () => {
    return dayjs().endOf("week").toDate();
  };

  static changeWeek = (currentWeek: Date, weekOffset: number, type: "week_start" | "week_end") => {
    return type === "week_start"
      ? dayjs(currentWeek).add(weekOffset, "week").startOf("week").toDate()
      : dayjs(currentWeek).add(weekOffset, "week").endOf("week").toDate();
  };

  static getMinAndMaxTimeRanges = (timeRanges: TimeRange[]) => {
    let minTimeRange = 2400;
    let maxTimeRange = 0;

    for (const range of timeRanges) {
      const { from, to } = Calendar.timeRangeToNumber(range);
      from < minTimeRange ? (minTimeRange = from) : undefined;
      to > maxTimeRange ? (maxTimeRange = to) : undefined;
    }

    return { minTimeRange, maxTimeRange };
  };

  static removeUnnecessaryTimeRanges = (
    defaultTimeRanges: TimeRange[],
    availableVisits: (AvailableVisit & {
      visitReservation: VisitReservation | null;
    })[]
  ): TimeRange[] => {
    const necessaryTimeRanges: TimeRange[] = [];

    const availableTimeRanges = availableVisits
      .filter((visit) => !visit.visitReservation)
      .map((visit) => ({
        from: Calendar.getHourOfDate(visit.dateFrom),
        to: Calendar.getHourOfDate(visit.dateTo),
      }));

    const { minTimeRange, maxTimeRange } = Calendar.getMinAndMaxTimeRanges(availableTimeRanges);

    for (const timeRange of defaultTimeRanges) {
      const { from, to } = Calendar.timeRangeToNumber(timeRange);

      if (from >= minTimeRange && to <= maxTimeRange) {
        necessaryTimeRanges.push(timeRange);
      }
    }

    return necessaryTimeRanges;
  };

  private static timeRangeToNumber = (timeRange: TimeRange) => {
    return {
      from: +timeRange.from.split(":").join(""),
      to: +timeRange.to.split(":").join(""),
    };
  };
}
