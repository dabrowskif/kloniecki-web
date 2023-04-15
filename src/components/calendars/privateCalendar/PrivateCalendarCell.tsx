import React, { MouseEventHandler, useContext } from "react";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";

import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { PrivateCellOccupation, type PrivateCalendarCell } from "~/utils/calendar/types";
import { PrivateCalendarContext } from "./PrivateCalendar";

interface IPrivateCalendarCellProps {
  cell: PrivateCalendarCell;
}

const PrivateCalendarCell = (props: IPrivateCalendarCellProps) => {
  const { dateFrom, dateTo, occupation, data: cellData } = props.cell;
  const ctx = api.useContext();
  const { openCellModal } = useContext(PrivateCalendarContext);

  const { mutate: createAvailableVisitDate } = api.availableVisit.create.useMutation({
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

  const { mutate: deleteAvailableVisitDate } = api.availableVisit.delete.useMutation({
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

  const getCellColor = (): string => {
    let color;
    if (occupation === PrivateCellOccupation.NONE) color = colorMap[occupation];
    if (occupation === PrivateCellOccupation.GOOGLE_EVENT) color = colorMap[occupation];
    if (occupation === PrivateCellOccupation.DEFAULT) {
      if (!cellData.visitReservation) {
        const key = `${occupation}-AVAILABLE`;
        color = colorMap[key];
      } else {
        const key = `${occupation}-${cellData.visitReservation.customerConfirmationStatus}-${cellData.visitReservation.ownerConfirmationStatus}`;
        color = colorMap[key];
      }
    }

    return color ?? "";
  };

  const handleCellClick = () => {
    if (occupation === PrivateCellOccupation.NONE) {
      createAvailableVisitDate({ dateFrom, dateTo });
    } else if (occupation === PrivateCellOccupation.DEFAULT) {
      if (cellData.visitReservation) {
        openCellModal(props.cell);
      } else {
        deleteAvailableVisitDate({ id: cellData.id });
      }
    }
  };

  return (
    <>
      <button
        data-tooltip-target="tooltip-default"
        disabled={occupation === PrivateCellOccupation.GOOGLE_EVENT}
        className={`transition-colors duration-150 ${getCellColor()}`}
        // className="bg-gradient-to-r from-yellow-500 from-0% from-50% to-blue-500 to-100% to-50%"
        onClick={handleCellClick}
      >
        <div className="p-2 text-center">
          {Calendar.getHourOfDate(dateFrom)} - {Calendar.getHourOfDate(dateTo)}
        </div>
        <hr />
      </button>
    </>
  );
};

export default PrivateCalendarCell;

const colorMap: Record<string, string> = {
  NONE: "bg-white text-dark-700 hover:bg-blue-400 hover:text-white",
  GOOGLE_EVENT: "bg-fuchsia-500 text-white",
  "DEFAULT-AVAILABLE": "bg-blue-700 hover:bg-blue-600 text-white",
  "DEFAULT-CONFIRMED-CONFIRMED": "bg-green-500 text-white",
  "DEFAULT-CONFIRMED-PENDING": "bg-blue-100 text-white",
  "DEFAULT-CONFIRMED-CANCELED": "bg-red-500 text-white",
  "DEFAULT-PENDING-CONFIRMED": "bg-yellow-300 text-white",
  "DEFAULT-PENDING-PENDING": "bg-yellow-300 text-white",
  "DEFAULT-PENDING-CANCELED": "bg-red-500 text-white",
  "DEFAULT-CANCELED-CONFIRMED": "bg-red-500 text-white",
  "DEFAULT-CANCELED-PENDING": "bg-red-500 text-white",
  "DEFAULT-CANCELED-CANCELED": "bg-red-500 text-white",
};
