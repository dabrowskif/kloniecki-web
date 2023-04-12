import React, { useContext } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type PrivateCalendarCell } from "~/utils/calendar/types";

interface IPrivateCalendarCellProps {
  columnCell: PrivateCalendarCell;
}

const PrivateCalendarCell = (props: IPrivateCalendarCellProps) => {
  const { dateFrom, dateTo, occupation, availableVisitId } = props.columnCell;
  const ctx = api.useContext();

  const { mutate: createAvailableVisitDate } =
    api.availableVisit.create.useMutation({
      onSuccess: () => {
        toast.success("Dodano dostępną wizyty");
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
        toast.success("Usunięto dostępną wizytę");
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
    if (occupation === "google_event") {
      return "bg-red-500 text-white";
    }
    if (occupation === "available") {
      return "bg-blue-700 text-white";
    }
    if (occupation === "confirmed") {
      return "bg-green-500 text-dark";
    }
    if (occupation === "unconfirmed") {
      return "bg-green-100 text-dark";
    }
    return "";
  };

  const handleCellClick = () => {
    if (occupation === "available") {
      availableVisitId && deleteAvailableVisitDate({ id: availableVisitId });
      return;
    }
    if (occupation === "none") {
      createAvailableVisitDate({ dateFrom, dateTo });
    }
  };

  return (
    <button
      disabled={occupation === "google_event"}
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
