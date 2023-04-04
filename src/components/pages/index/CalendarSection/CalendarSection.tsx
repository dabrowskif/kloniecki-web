/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, createContext } from "react";
import CalendarGrid from "~/components/publicCalendar/PublicCalendar";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type DateRange } from "~/utils/calendar/types";
import WeekPagination from "./WeekPagination";

export const CalendarContext = createContext<{
  // visitsCalendar: IVisitsCalendar;
  isFetching: boolean;
}>({
  // visitsCalendar: [],
  isFetching: false,
});

const CalendarSection = () => {
  const [currentWeek, setCurrentWeek] = useState<DateRange>({
    from: Calendar.getWeekStartDate(),
    to: Calendar.getWeekStartDate(),
  });

  const { data: visitsCalendar, isFetching } =
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

  return (
    <section id="kalendarz" className="bg-white p-10">
      <div className="justify-content-center flex flex-col items-center">
        <div className="w-9/12 ">
          <WeekPagination
            currentWeek={currentWeek}
            changeCurrentWeek={changeCurrentWeek}
          />
          <hr className="my-5  border-blue-500" />
          {/* change to .length !== 0 */}
          {visitsCalendar ? (
            <CalendarContext.Provider value={{ isFetching }}>
              <CalendarGrid visitsCalendar={visitsCalendar} />
            </CalendarContext.Provider>
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
