import React, { createContext, type Context } from "react";
import { Calendar } from "~/utils/calendar";
import { type CalendarColumn, type PublicCalendarCell } from "~/utils/calendar/types";
import PublicCalendarColumn from "./PublicCalendarColumn";

interface IPublicCalendarProps {
  calendarColumns: CalendarColumn<PublicCalendarCell>[];
  contextValue: CalendarContextValue;
}

const PublicCalendar = (props: IPublicCalendarProps) => {
  const { calendarColumns, contextValue } = props;

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className="grid grid-cols-5 divide-x border shadow-lg">
        {calendarColumns.map((column, i) => (
          <PublicCalendarColumn key={i} calendarColumn={column} />
        ))}
      </div>
    </CalendarContext.Provider>
  );
};

export default PublicCalendar;

export interface CalendarContextValue {
  handleCellClick: (cell: PublicCalendarCell) => void;
  getCellColor: (cell: PublicCalendarCell) => string;
}

export const CalendarContext = createContext<CalendarContextValue>({
  handleCellClick: () => {},
  getCellColor: () => "",
});
