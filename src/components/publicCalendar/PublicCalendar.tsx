import React from "react";
import { Calendar } from "~/utils/calendar";
import { type VisitsCalendar } from "~/utils/calendar/types";
import CalendarColumn from "./CalendarColumn";

interface IPublicCalendarProps {
  visitsCalendar: VisitsCalendar;
}
const PublicCalendar = (props: IPublicCalendarProps) => {
  const { visitsCalendar } = props;

  return (
    <div className="grid grid-cols-5 divide-x border shadow-lg">
      {visitsCalendar.map((calendarColumn, i) => (
        <CalendarColumn key={i} calendarColumn={calendarColumn} />
      ))}
    </div>
  );
};

export default PublicCalendar;
