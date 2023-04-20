/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type VisitsCalendar, type DateRange, type PublicCalendarCell } from "~/utils/calendar/types";
import ReservationForm from "./ReservationForm";
import WeekPagination from "../../../calendars/CalendarPagination";
import PublicCalendar from "~/components/calendars/publicCalendar/PublicCalendar";
import PublicCalendarColumn from "~/components/calendars/publicCalendar/PublicCalendarColumn";

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
      <div className="mx-auto mb-4 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Umów się na wizytę</h2>
        <p className="mt-4 text-gray-600">Wybierz datę i wypełnij formularz rezerwacji</p>
      </div>
      <WeekPagination currentWeek={currentWeek} changeCurrentWeek={changeCurrentWeek} />
      <hr className="mx-auto  my-5 max-w-5xl border-blue-500" />
      <PublicCalendar
        contextValue={{
          handleCellClick,
          getCellColor,
        }}
        calendarColumns={calendarColumns}
      />
      <ReservationForm selectedCell={selectedCell} />
    </section>
  );
};

export default CalendarSection;
