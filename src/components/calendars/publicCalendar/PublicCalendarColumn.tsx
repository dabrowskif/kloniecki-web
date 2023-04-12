import React from "react";
import { Calendar } from "~/utils/calendar";
import {
  type PublicCalendarCell,
  type CalendarColumn,
} from "~/utils/calendar/types";
import ColumnCell from "./PublicCalendarCell";

interface IPublicCalendarColumnProps {
  calendarColumn: CalendarColumn<PublicCalendarCell>;
}
const PublicCalendarColumn = (props: IPublicCalendarColumnProps) => {
  const { calendarColumn } = props;
  const { date, day, columnCells } = calendarColumn;

  return (
    <div className="flex flex-col">
      <div className="bg-blue-700 p-2 text-center text-white">
        {day} {Calendar.formatDate(date, "DateWithoutYear")}
      </div>
      <hr />
      {columnCells.map((cell, i) => (
        <ColumnCell key={i} cell={cell} />
      ))}
    </div>
  );
};

export default PublicCalendarColumn;
