import React, { createContext, type Context } from "react";
import { Calendar } from "~/utils/calendar";
import { type CalendarColumn, type ColumnCell } from "~/utils/calendar/types";
import PublicCalendarColumn from "./PublicCalendarColumn";

interface IPublicCalendarProps {
  calendarColumns: CalendarColumn[];
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
  handleCellClick: (cell: ColumnCell) => void;
  getCellColor: (cell: ColumnCell) => string;
}

export const CalendarContext = createContext<CalendarContextValue>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleCellClick: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getCellColor: () => "",
});
