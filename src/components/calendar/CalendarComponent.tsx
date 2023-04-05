import React, { createContext, type Context } from "react";
import { Calendar } from "~/utils/calendar";
import { type VisitsCalendar } from "~/utils/calendar/types";
import CalendarColumn from "./CalendarColumn";

interface IPublicCalendarProps {
  visitsCalendar: VisitsCalendar;
  contextValue: {
    isFetching: boolean;
    onCellClick: (params: IOnCellClickParams) => void;
  };
}

const CalendarComponent = (props: IPublicCalendarProps) => {
  const { visitsCalendar, contextValue } = props;

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className="grid grid-cols-5 divide-x border shadow-lg">
        {visitsCalendar.map((calendarColumn, i) => (
          <CalendarColumn key={i} calendarColumn={calendarColumn} />
        ))}
      </div>
    </CalendarContext.Provider>
  );
};

export default CalendarComponent;

export type IOnCellClickParams = {
  dateFrom: Date;
  dateTo: Date;
  cellId?: string;
};

export const CalendarContext = createContext<{
  isFetching: boolean;
  onCellClick: (params: IOnCellClickParams) => void;
}>({
  isFetching: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCellClick: () => {},
});
