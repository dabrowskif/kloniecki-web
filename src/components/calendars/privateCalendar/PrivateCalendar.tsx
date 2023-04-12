import React from "react";
import {
  type PrivateCalendarCell,
  type CalendarColumn,
} from "~/utils/calendar/types";
import PrivateCalendarColumn from "./PrivateCalendarColumn";

interface IPrivateCalendarProps {
  calendarColumns: CalendarColumn<PrivateCalendarCell>[];
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
  handleCellClick: (cell: PrivateCalendarCell) => void;
}
