import React, { createContext, useState } from "react";
import { type PrivateCalendarCell, type CalendarColumn } from "~/utils/calendar/types";
import CellModal from "./CellModal";
import PrivateCalendarColumn from "./PrivateCalendarColumn";

interface IPrivateCalendarProps {
  calendarColumns: CalendarColumn<PrivateCalendarCell>[];
}

const PrivateCalendar = (props: IPrivateCalendarProps) => {
  const { calendarColumns } = props;
  const [selectedCell, setSelectedCell] = useState<PrivateCalendarCell>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openCellModal = (cell: PrivateCalendarCell) => {
    setSelectedCell(cell);
    setIsModalOpen(true);
  };

  const closeCellModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      <PrivateCalendarContext.Provider value={{ openCellModal }}>
        <div className="grid grid-cols-5 divide-x border shadow-lg">
          {calendarColumns.map((column, i) => (
            <PrivateCalendarColumn key={i} calendarColumn={column} />
          ))}
        </div>
      </PrivateCalendarContext.Provider>
      {isModalOpen && <CellModal cell={selectedCell} handleClose={closeCellModal} />}
    </div>
  );
};

export default PrivateCalendar;

export interface PrivateCalendarContextValue {
  openCellModal: (cell: PrivateCalendarCell) => void;
}

export const PrivateCalendarContext = createContext<PrivateCalendarContextValue>({
  openCellModal: () => {},
});
