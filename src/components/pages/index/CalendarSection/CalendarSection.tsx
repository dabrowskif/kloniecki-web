/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, createContext, useEffect } from "react";
import CalendarColumn from "~/components/calendar/CalendarColumn";
import CalendarComponent, {
  type IOnCellClickParams,
} from "~/components/calendar/CalendarComponent";
import CalendarGrid from "~/components/calendar/CalendarComponent";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type VisitsCalendar, type DateRange } from "~/utils/calendar/types";
import WeekPagination from "./WeekPagination";

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

  const handleCellClick = ({ dateFrom, dateTo }: IOnCellClickParams) => {
    console.log(
      "cell clicked",
      Calendar.formatDate(dateFrom, "DateWithoutYear"),
      Calendar.getHourOfDate(dateFrom),
      Calendar.getHourOfDate(dateTo)
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
            <CalendarComponent
              contextValue={{ isFetching, onCellClick: handleCellClick }}
              visitsCalendar={visitsCalendar}
            />
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
