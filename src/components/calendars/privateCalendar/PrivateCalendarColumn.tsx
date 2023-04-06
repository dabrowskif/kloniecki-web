import React from "react";
import { Calendar } from "~/utils/calendar";
import { type CalendarColumn } from "~/utils/calendar/types";
import PrivateCalendarCell from "./PrivateCalendarCell";

interface IPrivateCalendarColumnProps {
  calendarColumn: CalendarColumn;
}
const PrivateCalendarColumn = (props: IPrivateCalendarColumnProps) => {
  const { calendarColumn } = props;
  const { date, day, columnCells } = calendarColumn;

  return (
    <div className="flex flex-col">
      <div className="p-2 text-center text-blue-700">
        {day} {Calendar.formatDate(date, "DateWithoutYear")}
      </div>
      <hr />
      {columnCells.map((cell, i) => (
        <PrivateCalendarCell key={i} columnCell={cell} />
      ))}
    </div>
  );
};

export default PrivateCalendarColumn;
