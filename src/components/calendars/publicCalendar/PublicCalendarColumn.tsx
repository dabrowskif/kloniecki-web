import React from "react";
import { Calendar } from "~/utils/calendar";
import { type CalendarColumn } from "~/utils/calendar/types";
import ColumnCell from "./PublicCalendarCell";

interface IPublicCalendarColumnProps {
  calendarColumn: CalendarColumn;
}
const PublicCalendarColumn = (props: IPublicCalendarColumnProps) => {
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

export default PublicCalendarColumn;
