import React, { useContext } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type ColumnCell } from "~/utils/calendar/types";

interface IPrivateCalendarCellProps {
  columnCell: ColumnCell;
}

const PrivateCalendarCell = (props: IPrivateCalendarCellProps) => {
  const { dateFrom, dateTo, occupation, availableVisitId } = props.columnCell;
  const ctx = api.useContext();

  const { mutate: createAvailableVisitDate } =
    api.availableVisit.create.useMutation({
      onSuccess: () => {
        toast.success("Dodano datę wizyty");
      },
      onError: (e) => {
        toast.error(e.message, {
          autoClose: 1000,
        });
      },
      onSettled: () => {
        void ctx.calendar.getPrivateCalendar.invalidate();
      },
    });

  const { mutate: deleteAvailableVisitDate } =
    api.availableVisit.delete.useMutation({
      onSuccess: () => {
        toast.success("Dodano datę wizyty");
      },
      onError: (e) => {
        toast.error(e.message, {
          autoClose: 1000,
        });
      },
      onSettled: () => {
        void ctx.calendar.getPrivateCalendar.invalidate();
      },
    });

  const getCellColor = () => {
    if (occupation === "available") {
      return "bg-blue-700 text-white";
    }
    if (occupation === "reserved") {
      return "bg-green-500 text-white";
    }
    if (occupation === "unavailable") {
      return "bg-white text-dark";
    }
    return "";
  };

  const handleCellClick = () => {
    if (occupation === "available") {
      availableVisitId && deleteAvailableVisitDate({ id: availableVisitId });
    }
    if (occupation === "unavailable") {
      createAvailableVisitDate({ dateFrom, dateTo });
    }
  };

  return (
    <button
      className={`transition-colors duration-150 ${getCellColor()}`}
      onClick={handleCellClick}
    >
      <div className="p-2 text-center">
        {Calendar.getHourOfDate(dateFrom)} - {Calendar.getHourOfDate(dateTo)}
      </div>
      <hr />
    </button>
  );
};

export default PrivateCalendarCell;
