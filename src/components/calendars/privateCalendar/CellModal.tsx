import React from "react";
import { PrivateCellOccupation, type PrivateCalendarCell } from "~/utils/calendar/types";
import { MdClose } from "react-icons/md";
import { BsCalendarWeek } from "react-icons/bs";
import { AiOutlineClockCircle, AiOutlinePhone, AiOutlineMail, AiOutlineContacts } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { Calendar } from "~/utils/calendar";
import { type ConfirmationStatus } from "@prisma/client";
import { useEffect } from "react";

interface ICellModalProps {
  cell?: PrivateCalendarCell;
  handleClose: () => void;
}

const CellModal = (props: ICellModalProps) => {
  const { cell, handleClose } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (cell?.occupation !== PrivateCellOccupation.DEFAULT || !cell.data.visitReservation) {
    return null;
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50"
        onClick={handleClose}
      >
        <div className="relative m-5 w-full rounded-sm bg-white p-10 md:w-1/2 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
          <button className="absolute right-0 top-0 p-2 hover:text-gray-800" onClick={handleClose}>
            <MdClose className="text-red-600 hover:text-red-800" size={24} />
          </button>
          <div>
            <div className="mb-5 flex justify-between gap-3">
              <div>
                <span>Status klienta:</span>
                {getConfirmationStatus(cell.data.visitReservation.customerConfirmationStatus)}
              </div>
              <div>
                <span>Twój status:</span>
                {getConfirmationStatus(cell.data.visitReservation.ownerConfirmationStatus)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <BsCalendarWeek className="self-center" />
                <span className="font-bold">
                  {Calendar.getDay(cell.dateFrom).charAt(0).toUpperCase() + Calendar.getDay(cell.dateFrom).slice(1)}{" "}
                </span>
                {Calendar.formatDate(cell.dateFrom, "DateWithYear")}
              </div>
              <div className="flex gap-3">
                <AiOutlineClockCircle className="self-center" />
                {Calendar.formatDate(cell.dateFrom, "HourWithMinutes")} - {Calendar.formatDate(cell.dateTo, "HourWithMinutes")}
              </div>
            </div>
            <div className="my-5 flex flex-col">
              {cell.data.visitReservation?.name && (
                <div className="flex gap-5">
                  <AiOutlineContacts className="self-center" />
                  <a href={`mailto:${cell.data.visitReservation?.name}`}>{cell.data.visitReservation?.name}</a>
                </div>
              )}
              {cell.data.visitReservation?.email && (
                <div className="flex gap-5">
                  <AiOutlineMail className="self-center" />
                  <a href={`mailto:${cell.data.visitReservation?.email}`} className="text-blue-500">
                    {cell.data.visitReservation?.email}
                  </a>
                </div>
              )}
              {cell.data.visitReservation?.phoneNumber && (
                <div className="flex gap-5">
                  <AiOutlinePhone className="self-center" />
                  <a href={`tel:${cell.data.visitReservation?.phoneNumber}`} className="text-blue-500">
                    {cell.data.visitReservation?.phoneNumber}
                  </a>
                </div>
              )}

              {cell.data.visitReservation?.message && (
                <div className="flex gap-5">
                  <MdOutlineMessage className="self-center" />
                  <p>{cell.data.visitReservation?.message}</p>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button className="button-primary px-10">Potwierdź</button>
              <button className="button-danger px-10">Odwołaj</button>
            </div>
          </div>

          {/* <button className="mt-5 w-full bg-dark-500 px-10 py-2 text-white hover:bg-red-800">Zamknij</button> */}
        </div>
      </div>
    </>
  );
};

export default CellModal;

const getConfirmationStatus = (status: ConfirmationStatus) => {
  let text;
  let color = "";
  switch (status) {
    case "CONFIRMED":
      text = `potwierdzone`;
      color = "bg-green-500 text-white";
      break;
    case "CANCELED":
      text = `odwołane`;
      color = "bg-red-500 text-white";
      break;
    case "PENDING":
      text = `oczekujące`;
      color = "bg-yellow-300 text-white";
      break;
  }
  return <div className={`rounded-sm ${color} p-2`}>{text}</div>;
};
