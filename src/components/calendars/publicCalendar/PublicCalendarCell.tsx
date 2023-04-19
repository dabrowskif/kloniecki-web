import React, { useContext } from "react";
import { Calendar } from "~/utils/calendar";
import { CalendarContext } from "./PublicCalendar";
import { type PublicCalendarCell as TPublicCalendarCell } from "~/utils/calendar/types";

interface IPublicCalendarCellProps {
  cell: TPublicCalendarCell;
}

const PublicCalendarCell = (props: IPublicCalendarCellProps) => {
  const { cell } = props;
  const { dateFrom, dateTo } = cell;
  const { handleCellClick, getCellColor } = useContext(CalendarContext);

  const cellStyle = getCellColor(cell);

  return (
    <button
      className={`transition-colors duration-150 ${cellStyle}`}
      disabled={cell.occupation !== "available"}
      onClick={() => handleCellClick(cell)}
    >
      <div className="whitespace-nowrap p-2 text-center">
        {Calendar.getHourOfDate(dateFrom)} - {Calendar.getHourOfDate(dateTo)}
      </div>
      <hr />
    </button>
  );
};

export default PublicCalendarCell;
