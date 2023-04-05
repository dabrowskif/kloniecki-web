/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, createContext, useEffect } from "react";
import CalendarColumn from "~/components/publicCalendar/CalendarColumn";
import CalendarGrid from "~/components/publicCalendar/PublicCalendar";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type VisitsCalendar, type DateRange } from "~/utils/calendar/types";
import WeekPagination from "./WeekPagination";

export const CalendarContext = createContext<{
  isFetching: boolean;
  onCellClick: (dateFrom: Date, dateTo: Date) => void;
}>({
  isFetching: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCellClick: () => {},
});

const CalendarSection = () => {
  const [currentWeek, setCurrentWeek] = useState<DateRange>({
    from: Calendar.getWeekStartDate(),
    to: Calendar.getWeekStartDate(),
  });
  const [visitsCalendar, setVisitsCalendar] = useState<VisitsCalendar>([]);

  const { data: visitsCalendarData, isFetching } =
    api.calendar.getPublicCalendar.useQuery({
      weekStartDate: currentWeek.from,
      weekEndDate: currentWeek.to,
    });

  const changeCurrentWeek = (weekOffset: number): void => {
    setCurrentWeek((prevState) => ({
      from: Calendar.changeWeek(prevState.from, weekOffset),
      to: Calendar.changeWeek(prevState.from, weekOffset),
    }));
  };

  useEffect(() => {
    if (!isFetching && visitsCalendarData) {
      setVisitsCalendar(visitsCalendarData);
    }
  }, [isFetching, visitsCalendarData]);

  const handleCellClick = (dateFrom: Date, dateTo: Date) => {
    console.log(
      "cell clicked",
      Calendar.formatDate(dateFrom, "DateWithoutYear"),
      Calendar.formatDate(dateTo, "DateWithoutYear")
    );
  };

  return (
    <section id="kalendarz" className="bg-white p-10">
      <div className="justify-content-center flex flex-col items-center">
        <div className="w-9/12 ">
          <WeekPagination
            currentWeek={currentWeek}
            changeCurrentWeek={changeCurrentWeek}
          />
          <hr className="my-5  border-blue-500" />
          {visitsCalendar ? (
            <div className="relative">
              <CalendarContext.Provider
                value={{ isFetching, onCellClick: handleCellClick }}
              >
                <div className="grid grid-cols-5 divide-x border shadow-lg">
                  {visitsCalendar.map((calendarColumn, i) => (
                    <CalendarColumn key={i} calendarColumn={calendarColumn} />
                  ))}
                </div>
              </CalendarContext.Provider>
            </div>
          ) : (
            <>
              <p className="text-center text-xl">Brak wolnych terminów.</p>
              <p className="text-center">
                Mozesz skontaktować się ze mną osobiście, korzystając z
                formularza powyzej.
              </p>
            </>
          )}
        </div>
        {/* <ReservationForm selectedReservationDate={selectedReservationDate} /> */}
        <div className="flex flex-col items-center justify-center space-y-4 align-middle"></div>
      </div>
    </section>
  );
};

export default CalendarSection;
