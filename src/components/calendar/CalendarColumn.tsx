import React, { useContext } from "react";
import { Calendar } from "~/utils/calendar";
import { CalendarContext } from "../pages/index/CalendarSection/CalendarSection";
import CalendarCell from "./CalendarCell";
import { CalendarDayContext } from "./CalendarGrid";

const CalendarColumn = () => {
  const { currentWeek } = useContext(CalendarContext);
  const { day, dayIndex } = useContext(CalendarDayContext);

  const timeRanges = Calendar.getAvailableTimeRanges();
  const currentDate = Calendar.getDateOfWeekDay(currentWeek.from, dayIndex + 1);

  return (
    <div className="flex flex-col">
      <div className="p-2 text-center text-blue-700">
        {day} {Calendar.formatDate(currentDate, "DateWithoutYear")}
      </div>
      <hr />
      {timeRanges.map((timeRange, i) => (
        <CalendarCell key={i} currentDate={currentDate} timeRange={timeRange} />
      ))}
    </div>
  );
};

export default CalendarColumn;
