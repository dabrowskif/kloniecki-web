import React, { useContext } from "react";
import { Calendar } from "~/utils/calendar";
import { ColumnCell } from "~/utils/calendar/types";
import { CalendarContext } from "../pages/index/CalendarSection/CalendarSection";

interface IColumnCellProps {
  columnCell: ColumnCell;
}

const ColumnCell = (props: IColumnCellProps) => {
  const { columnCell } = props;
  const { from, to, occupation } = columnCell;
  const { isFetching } = useContext(CalendarContext);

  const buttonStyle =
    occupation === "available" ? "" : "text-gray-400 bg-gray-100";

  return (
    <button
      className={`${buttonStyle}`}
      onClick={() => console.log(occupation)}
    >
      <div className="p-2 text-center">
        {from} - {to}
      </div>
      <hr />
    </button>
  );
};

export default ColumnCell;
