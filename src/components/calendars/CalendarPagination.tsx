import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Calendar } from "~/utils/calendar";
import { type DateRange } from "~/utils/calendar/types";
interface IWeekPaginationProps {
  changeCurrentWeek: (weekOffset: number) => void;
  currentWeek: DateRange;
}

const WeekPagination = (props: IWeekPaginationProps) => {
  const { changeCurrentWeek, currentWeek } = props;

  // const [isNextWeekAvailable, setIsNextWeekAvailable] = useState(true);
  const [isPrevWeekAvailable, setIsPrevWeekAvailable] = useState(false);

  useEffect(() => {
    if (Calendar.compareDates(currentWeek.from, Calendar.getWeekStartDate()) <= 0) {
      setIsPrevWeekAvailable(false);
    } else {
      setIsPrevWeekAvailable(true);
    }
  }, [currentWeek]);

  return (
    <div className="flex items-center justify-center gap-10">
      <button
        type="button"
        className={`focusable p-2.5 text-center text-sm font-medium text-white  ${
          !isPrevWeekAvailable ? "button-primary-disabled" : "button-primary "
        }`}
        disabled={!isPrevWeekAvailable}
        onClick={() => {
          changeCurrentWeek(-1);
        }}
      >
        <AiOutlineArrowLeft size={20} />
      </button>
      <div className="block md:flex md:gap-5">
        <h2 className="whitespace-nowrap">{Calendar.formatDate(currentWeek.from, "DateWithYear")}</h2>
        <h2 className="text-center"> - </h2>
        <h2 className="whitespace-nowrap">{Calendar.formatDate(currentWeek.to, "DateWithYear")}</h2>
      </div>
      <button
        type="button"
        className={`focusable p-2.5 text-center text-sm font-medium text-white  ${"button-primary"}`}
        onClick={() => {
          changeCurrentWeek(1);
        }}
      >
        <AiOutlineArrowRight size={20} />
      </button>
    </div>
  );
};

export default WeekPagination;
