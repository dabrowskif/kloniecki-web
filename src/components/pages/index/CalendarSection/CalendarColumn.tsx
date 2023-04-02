import { type SetStateAction } from "react";
import {
  type Day,
  filterUnnecessaryTimeRanges,
  timeRanges,
  isPastDate,
  type TimeRange,
  type DateWithTime,
} from "~/utils/calendar";
import dayjs, { DateFormats } from "~/utils/dayjs";
import CalendarCell from "./CalendarCell";

interface CalendarCellProps {
  dayIndex: number;
  day: Day;
  currentWeek: TimeRange;
  reservedVisitDates: {
    date: string;
    id: string;
    from: string;
    to: string;
  }[];
  isFetching: boolean;
  selectedReservationDate: DateWithTime | undefined;
  setSelectedReservationDate: (
    value: SetStateAction<DateWithTime | undefined>
  ) => void;
}
const CalendarColumn = (props: CalendarCellProps) => {
  const {
    dayIndex,
    day,
    currentWeek,
    reservedVisitDates,
    isFetching,
    selectedReservationDate,
    setSelectedReservationDate,
  } = props;

  return (
    <>
      <div className="flex flex-col ">
        <div className="p-2 text-center text-blue-700">
          {day}{" "}
          {dayjs(currentWeek.from)
            .day(dayIndex + 1)
            .format(DateFormats.DateFormatWithoutYear)}
        </div>
        <hr />
        {filterUnnecessaryTimeRanges(reservedVisitDates ?? [], timeRanges).map(
          (timeRange, j) => (
            <CalendarCell
              key={j}
              currentWeek={currentWeek}
              day={day}
              dayIndex={dayIndex}
              isFetching={isFetching}
              timeRange={timeRange}
              reservedVisitDates={reservedVisitDates}
              selectedReservationDate={selectedReservationDate}
              setSelectedReservationDate={setSelectedReservationDate}
            />
          )
        )}
      </div>
    </>
  );
};

export default CalendarColumn;
