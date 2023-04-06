import React, { createContext, type Context } from "react";
import { Calendar } from "~/utils/calendar";
import {
  type CalendarColumn,
  type ColumnCell,
  type VisitsCalendar,
} from "~/utils/calendar/types";
import PrivateCalendarColumn from "./PrivateCalendarColumn";

interface IPrivateCalendarProps {
  calendarColumns: CalendarColumn[];
}

const PrivateCalendar = (props: IPrivateCalendarProps) => {
  const { calendarColumns } = props;

  return (
    <div className="grid grid-cols-5 divide-x border shadow-lg">
      {calendarColumns.map((column, i) => (
        <PrivateCalendarColumn key={i} calendarColumn={column} />
      ))}
    </div>
  );
};

export default PrivateCalendar;

export interface PrivateCalendarContextValue {
  handleCellClick: (cell: ColumnCell) => void;
}
