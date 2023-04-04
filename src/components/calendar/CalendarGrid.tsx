import React, { createContext } from "react";
import { Calendar } from "~/utils/calendar";
import CalendarColumn from "./CalendarColumn";

export const CalendarDayContext = createContext<{
  day: string;
  dayIndex: number;
}>({ day: "day", dayIndex: 0 });

const CalendarGrid = () => {
  const days = Calendar.getAvailableDays();

  return (
    <div className="grid grid-cols-5 divide-x border shadow-lg">
      {days.map((day, i) => (
        <CalendarDayContext.Provider key={i} value={{ day, dayIndex: i + 1 }}>
          <CalendarColumn />
        </CalendarDayContext.Provider>
      ))}
    </div>
  );
};

export default CalendarGrid;
