/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type VisitsCalendar, type DateRange, type PublicCalendarCell } from "~/utils/calendar/types";
import ReservationForm from "./ReservationForm";
import WeekPagination from "../../../calendars/CalendarPagination";
import PublicCalendar from "~/components/calendars/publicCalendar/PublicCalendar";

const CalendarSection = () => {
  const [currentWeek, setCurrentWeek] = useState<DateRange>({
    from: Calendar.getWeekStartDate(),
    to: Calendar.getWeekEndDate(),
  });
  const [calendarColumns, setCalendarColumns] = useState<VisitsCalendar<PublicCalendarCell>>([]);

  const [selectedCell, setSelectedCell] = useState<PublicCalendarCell>();

  const { data: visitsCalendarData, isFetching } = api.calendar.getPublicCalendar.useQuery({
    weekStartDate: currentWeek.from,
    weekEndDate: currentWeek.to,
  });

  const changeCurrentWeek = (weekOffset: number): void => {
    setCurrentWeek((prevState) => ({
      from: Calendar.changeWeek(prevState.from, weekOffset, "week_start"),
      to: Calendar.changeWeek(prevState.to, weekOffset, "week_end"),
    }));
  };

  useEffect(() => {
    if (!isFetching && visitsCalendarData) {
      setCalendarColumns(visitsCalendarData);
    }
  }, [isFetching, visitsCalendarData]);

  const handleCellClick = (cell: PublicCalendarCell) => {
    setSelectedCell(cell);
  };

  const getCellColor = (cell: PublicCalendarCell) => {
    if (
      selectedCell &&
      Calendar.areDatesEqual(selectedCell?.dateFrom, cell.dateFrom, "minute") &&
      Calendar.areDatesEqual(selectedCell?.dateTo, cell.dateTo, "minute")
    ) {
      return "bg-blue-700 text-white";
    }
    if (cell.occupation === "available") {
      return "bg-white text-dark-700 hover:bg-blue-500 hover:text-white";
    }
    if (cell.occupation === "unavailable") {
      return "bg-gray-100 text-gray-400";
    }
    return "";
  };

  return (
    <section id="kalendarz" className="bg-white p-10">
      <div className="flex flex-col items-center">
        <div className="w-9/12 ">
          <WeekPagination currentWeek={currentWeek} changeCurrentWeek={changeCurrentWeek} />
          <hr className="my-5  border-blue-500" />
          {calendarColumns ? (
            <PublicCalendar
              contextValue={{
                handleCellClick,
                getCellColor,
              }}
              calendarColumns={calendarColumns}
            />
          ) : (
            <>
              <p className="text-center text-xl">Brak wolnych terminów.</p>
              <p className="text-center">Mozesz skontaktować się ze mną osobiście, korzystając z formularza powyzej.</p>
            </>
          )}
        </div>
        <ReservationForm selectedCell={selectedCell} />
        <div className="flex flex-col items-center justify-center space-y-4 align-middle"></div>
      </div>
    </section>
  );
};

export default CalendarSection;
