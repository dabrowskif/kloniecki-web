import React from "react";
import { Calendar } from "~/utils/calendar";
import CalendarCell from "./CalendarCell";

interface ICalendarColumnProps {
  date: Date;
}
const CalendarColumn = (props: ICalendarColumnProps) => {
  const { date } = props;
  const timeRanges = Calendar.getAvailableTimeRanges();

  return (
    <div className="flex flex-col">
      <div className="p-2 text-center text-blue-700">
        {Calendar.getDay(date)} {Calendar.formatDate(date, "DateWithoutYear")}
      </div>
      <hr />
      {timeRanges.map((timeRange, i) => (
        <CalendarCell key={i} currentDate={date} timeRange={timeRange} />
      ))}
    </div>
  );
};

export default CalendarColumn;
