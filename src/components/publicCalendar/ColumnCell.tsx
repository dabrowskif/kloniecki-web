import React, { useContext } from "react";
import { Calendar } from "~/utils/calendar";
import { ColumnCell } from "~/utils/calendar/types";
import { CalendarContext } from "../pages/index/CalendarSection/CalendarSection";

interface IColumnCellProps {
  columnCell: ColumnCell;
}

const ColumnCell = (props: IColumnCellProps) => {
  const { columnCell } = props;
  const { dateFrom, dateTo, occupation } = columnCell;
  const { isFetching, onCellClick } = useContext(CalendarContext);

  const buttonStyle = isFetching
    ? "bg-loading"
    : occupation !== "available"
    ? "text-gray-400 bg-gray-100"
    : "";

  return (
    <button
      className={`${buttonStyle}`}
      onClick={() => onCellClick(dateFrom, dateTo)}
    >
      <div className="p-2 text-center">
        {Calendar.getHourOfDate(dateFrom)} - {Calendar.getHourOfDate(dateTo)}
      </div>
      <hr />
    </button>
  );
};

export default ColumnCell;
