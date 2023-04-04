import React, { useContext } from "react";
import { Calendar } from "~/utils/calendar";
import { EOccupation, type DetailedTimeRange } from "~/utils/calendar/types";
import { CalendarContext } from "../pages/index/CalendarSection/CalendarSection";

interface ICalendarCellProps {
  detailedTimeRange: DetailedTimeRange;
}

const CalendarCell = (props: ICalendarCellProps) => {
  const { detailedTimeRange } = props;
  const { from, to, occupation } = detailedTimeRange;
  const { isFetching } = useContext(CalendarContext);
  console.log(occupation);
  const buttonBackgroundColor =
    occupation === EOccupation.Reserved ? "bg-blue-500" : "";

  return (
    <button className={`${buttonBackgroundColor}`}>
      <div className="p-2 text-center">
        {from} - {to}
      </div>
      <hr />
    </button>
  );
};

export default CalendarCell;

{
  /* {timeRanges.map((timeRange, j) => {
            const date = dayjs(currentWeek.from)
              .day(i + 1)
              .format(DateFormats.DateFormatWithYear);

            const selectedDate = {
              date,
              from: timeRange.from,
              to: timeRange.to,
            };

            const availableVisitDate = availableVisitDates?.find(
              (date) =>
                date.date === selectedDate.date &&
                date.from === selectedDate.from &&
                date.to === selectedDate.to
            );

            const start = mappedEvents[0]?.start;
            const gDate = dayjs(start).format("YYYY-MM-DD");
            const end = mappedEvents[0]?.end;
            const startTime = dayjs(start).format("HH:mm");
            const endTime = dayjs(end).format("HH:mm");

            console.log(gDate, startTime, endTime);
            console.log(availableVisitDate);
            return (
              <button
                name={`Wizyta w ${day} od ${timeRange.from} do ${timeRange.to}`}
                key={j}
                className={`transition-colors duration-150 ${
                  selectedDate.date === gDate &&
                  (selectedDate?.from === startTime ||
                    selectedDate?.to === endTime)
                    ? "bg-red-500 text-gray-900"
                    : availableVisitDate?.visitReservation?.id
                    ? "bg-green-400 text-white"
                    : availableVisitDate
                    ? "bg-blue-700 text-white"
                    : isFetching
                    ? "bg-loading"
                    : "bg-white text-gray-900"
                }`}
                disabled={
                  isFetching ||
                  isCreating ||
                  isDeleting ||
                  availableVisitDate?.visitReservation?.id !== undefined
                }
                onClick={() => {
                  if (availableVisitDate) {
                    deleteAvailableVisitDate({ id: availableVisitDate.id });
                  } else {
                    createAvailableVisitDate(selectedDate);
                  }
                }}
              >
                <div className="p-2 text-center">
                  {timeRange.from} - {timeRange.to}
                </div>
                <hr />
              </button>
            );
          })} */
}
