import React from "react";
import { Calendar } from "~/utils/calendar";
import CalendarColumn from "./CalendarColumn";

interface IPublicCalendarProps {
  currentWeek: {
    from: Date;
    to: Date;
  };
}
const PublicCalendar = (props: IPublicCalendarProps) => {
  const { currentWeek } = props;

  const days = Calendar.getAvailableDays();

  return (
    <div className="grid grid-cols-5 divide-x border shadow-lg">
      {days.map((_, i) => {
        const date = Calendar.getDateOfWeekDay(currentWeek.from, i + 1);
        return <CalendarColumn key={i} date={date} />;
      })}
    </div>
  );
};

export default PublicCalendar;
