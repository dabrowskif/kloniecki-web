import React from "react";
import { Calendar } from "~/utils/calendar";
import { CalendarColumn } from "~/utils/calendar/types";
import ColumnCell from "./ColumnCell";

interface ICalendarColumnProps {
  calendarColumn: CalendarColumn;
}
const CalendarColumn = (props: ICalendarColumnProps) => {
  const { calendarColumn } = props;
  const { date, day, columnCells } = calendarColumn;
  return (
    <div className="flex flex-col">
      <div className="p-2 text-center text-blue-700">
        {day} {Calendar.formatDate(date, "DateWithoutYear")}
      </div>
      <hr />
      {columnCells.map((cell, i) => (
        <ColumnCell key={i} columnCell={cell} />
      ))}
    </div>
  );
};

export default CalendarColumn;
