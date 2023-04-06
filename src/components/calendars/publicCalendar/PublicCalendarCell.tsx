import React, { useContext } from "react";
import { Calendar } from "~/utils/calendar";
import { type ColumnCell } from "~/utils/calendar/types";
import { CalendarContext } from "./PublicCalendar";

interface IPublicCalendarCellProps {
  columnCell: ColumnCell;
}

const PublicCalendarCell = (props: IPublicCalendarCellProps) => {
  const { columnCell } = props;
  const { dateFrom, dateTo } = columnCell;
  const { handleCellClick, getCellColor } = useContext(CalendarContext);

  const cellStyle = getCellColor(columnCell);

  return (
    <button
      className={`transition-colors duration-150 ${cellStyle}`}
      disabled={columnCell.occupation !== "available"}
      onClick={() => handleCellClick(columnCell)}
    >
      <div className="p-2 text-center">
        {Calendar.getHourOfDate(dateFrom)} - {Calendar.getHourOfDate(dateTo)}
      </div>
      <hr />
    </button>
  );
};

export default PublicCalendarCell;
