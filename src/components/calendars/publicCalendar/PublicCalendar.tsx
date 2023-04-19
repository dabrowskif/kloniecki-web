import React, { createContext, useState, type Context } from "react";
import { Calendar } from "~/utils/calendar";
import { type CalendarColumn, type PublicCalendarCell } from "~/utils/calendar/types";
import PublicCalendarColumn from "./PublicCalendarColumn";

interface IPublicCalendarProps {
  calendarColumns: CalendarColumn<PublicCalendarCell>[];
  contextValue: CalendarContextValue;
}

const PublicCalendar = (props: IPublicCalendarProps) => {
  const { calendarColumns, contextValue } = props;

  const [selectedColumn, setSelectedColumn] = useState<CalendarColumn<PublicCalendarCell>>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(calendarColumns.find((column) => column.day === event.target.value));
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {calendarColumns[0]?.columnCells.length === 0 ? (
        <p className="text-center">
          Brak wolnych wizyt, lub kalendarz nie został jeszcze udostępniony. Proszę - skontaktuj się ze mną osobiście
        </p>
      ) : (
        <>
          <div className="md:hidden">
            <label htmlFor="day" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Wybierz dzień
            </label>
            <select
              id="day"
              onChange={handleSelectChange}
              className="mb-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="poniedziałek">Poniedziałek</option>
              <option value="wtorek">Wtorek</option>
              <option value="środa">Środa</option>
              <option value="czwartek">Czwartek</option>
              <option value="piątek">Piątek</option>
            </select>
            <div className="shadow-lg">
              {selectedColumn && <PublicCalendarColumn key={selectedColumn?.day} calendarColumn={selectedColumn} />}
            </div>
          </div>
          <div className="hidden grid-cols-5 justify-center divide-x shadow-lg md:grid">
            {calendarColumns.map((column, i) => (
              <PublicCalendarColumn key={i} calendarColumn={column} />
            ))}
          </div>
        </>
      )}
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

// <div className="m-5 grid w-full grid-cols-5 divide-x overflow-x-auto border shadow-lg">
{
  /* <div className="mx-auto grid max-w-screen-md grid-cols-5"> */
}
