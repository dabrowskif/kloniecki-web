import React, { useContext } from "react";
import { Calendar } from "~/utils/calendar";
import { CalendarContext } from "../pages/index/CalendarSection/CalendarSection";

interface ICalendarCellProps {
  timeRange: {
    from: string;
    to: string;
  };
  currentDate: Date;
}

const CalendarCell = (props: ICalendarCellProps) => {
  const { timeRange, currentDate } = props;
  const { availableVisitDates } = useContext(CalendarContext);

  const cellDateDetails = {
    date: currentDate,
    timeFrom: timeRange.from,
    timeTo: timeRange.to,
  };

  const availableVisitDate = availableVisitDates.find(
    (date) =>
      Calendar.areDatesEqual(date.dateFrom, currentDate, "day") &&
      Calendar.getHourOfDate(date.dateFrom) === cellDateDetails.timeFrom
  );

  const buttonBackgroundColor = availableVisitDate ? "bg-blue-500" : "";

  return (
    <button
      name={`Wizyta w ${Calendar.formatDate(currentDate, "DateWithYear")} od ${
        timeRange.from
      } do ${timeRange.to}`}
      className={`${buttonBackgroundColor}`}
    >
      <div className="p-2 text-center">
        {timeRange.from} - {timeRange.to}
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
