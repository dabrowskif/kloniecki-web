import React, { type SetStateAction } from "react";
import {
  type DateWithTime,
  isPastDate,
  type TimeRange,
  type Day,
} from "~/utils/calendar";
import dayjs, { DateFormats } from "~/utils/dayjs";

interface ICalendarCellProps {
  dayIndex: number;
  timeRange: TimeRange;
  currentWeek: TimeRange;
  reservedVisitDates: (DateWithTime & { id: string })[];
  selectedReservationDate: DateWithTime | undefined;
  isFetching: boolean;
  day: Day;
  setSelectedReservationDate: (
    value: SetStateAction<DateWithTime | undefined>
  ) => void;
}

const CalendarCell = (props: ICalendarCellProps) => {
  const {
    dayIndex,
    timeRange,
    reservedVisitDates,
    currentWeek,
    selectedReservationDate,
    isFetching,
    day,
    setSelectedReservationDate,
  } = props;

  const date = dayjs(currentWeek.from)
    .day(dayIndex + 1)
    .format(DateFormats.DateFormatWithYear);

  const selectedDate = {
    date,
    from: timeRange.from,
    to: timeRange.to,
  };

  const reservedVisitDate = reservedVisitDates?.find(
    (date) =>
      date.date === selectedDate.date &&
      date.from === selectedDate.from &&
      date.to === selectedDate.to
  );
  isPastDate(selectedDate);

  return (
    <button
      name={`Wizyta w ${day} od ${timeRange.from} do ${timeRange.to}`}
      className={`transition-colors duration-150 ${
        !reservedVisitDate || isPastDate(reservedVisitDate)
          ? " bg-gray-100 text-gray-400 "
          : isFetching
          ? "bg-loading"
          : selectedDate.date === selectedReservationDate?.date &&
            selectedDate.from === selectedReservationDate?.from &&
            selectedDate.to === selectedReservationDate?.to
          ? "bg-blue-700 text-white"
          : "bg-white text-gray-900"
      }`}
      disabled={
        isFetching || !reservedVisitDate || isPastDate(reservedVisitDate)
      }
      onClick={() => {
        setSelectedReservationDate(selectedDate);
      }}
    >
      <div className="p-2 text-center">
        {timeRange.from} - {timeRange.to}
      </div>
      <hr />
    </button>
  );
};

export default CalendarCell;
