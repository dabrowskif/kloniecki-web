/* eslint-disable @typescript-eslint/no-explicit-any */

import { type SetStateAction, useState } from "react";
import { api } from "~/utils/api";
import {
  daysOfWeek,
  timeRanges,
  filterUnnecessaryTimeRanges,
  type DateWithTime,
  type TimeRange,
} from "~/utils/calendar";
import dayjs, { DateFormats } from "~/utils/dayjs";
import CalendarColumn from "./CalendarColumn";
import ReservationForm from "./ReservationForm";
import WeekPagination from "./WeekPagination";

const CalendarSection = () => {
  const ctx = api.useContext();

  const [currentWeek, setCurrentWeek] = useState<TimeRange>({
    from: dayjs().startOf("week").format(DateFormats.DateFormatWithYear),
    to: dayjs().endOf("week").format(DateFormats.DateFormatWithYear),
  });

  const [selectedReservationDate, setSelectedReservationDate] = useState<
    DateWithTime | undefined
  >();

  const { data: reservedVisitDates, isFetching } =
    api.availableVisitDate.findMany.useQuery({
      dateFrom: currentWeek.from,
      dateTo: currentWeek.to,
    });

  const changeCurrentWeek = (weekOffset: number): void => {
    setCurrentWeek((prevState) => ({
      from: dayjs(prevState.from)
        .add(weekOffset, "week")
        .startOf("week")
        .format(DateFormats.DateFormatWithYear),
      to: dayjs(prevState.to)
        .add(weekOffset, "week")
        .endOf("week")
        .format(DateFormats.DateFormatWithYear),
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
          {filterUnnecessaryTimeRanges(reservedVisitDates ?? [], timeRanges)
            .length !== 0 ? (
            <div
              className={`grid grid-cols-5 divide-x border shadow-lg ${
                isFetching ? "bg-loading" : ""
              }`}
            >
              {daysOfWeek.map((day, i) => (
                <CalendarColumn
                  key={i}
                  dayIndex={i}
                  day={day}
                  currentWeek={currentWeek}
                  isFetching={isFetching}
                  reservedVisitDates={reservedVisitDates ?? []}
                  selectedReservationDate={selectedReservationDate}
                  setSelectedReservationDate={setSelectedReservationDate}
                />
              ))}
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
        <ReservationForm selectedReservationDate={selectedReservationDate} />
        <div className="flex flex-col items-center justify-center space-y-4 align-middle"></div>
      </div>
    </section>
  );
};

export default CalendarSection;
