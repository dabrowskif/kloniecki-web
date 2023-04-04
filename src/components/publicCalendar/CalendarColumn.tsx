import React from "react";
import { Calendar } from "~/utils/calendar";
import { CalendarColumn } from "~/utils/calendar/types";
import CalendarCell from "./CalendarCell";

interface ICalendarColumnProps {
  calendarColumn: CalendarColumn;
}
const CalendarColumn = (props: ICalendarColumnProps) => {
  const { calendarColumn } = props;
  const { date, detailedTimeRanges, day } = calendarColumn;

  return (
    <div className="flex flex-col">
      <div className="p-2 text-center text-blue-700">
        {day} {Calendar.formatDate(date, "DateWithoutYear")}
      </div>
      <hr />
      {detailedTimeRanges.map((timeRange, i) => (
        <CalendarCell key={i} timeRange={timeRange} />
      ))}
    </div>
  );
};

export default CalendarColumn;
