import React, { useState } from "react";
import { type TimeRange } from "~/utils/calendar";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
interface IWeekPaginationProps {
  changeCurrentWeek: (weekOffset: number) => void;
  currentWeek: TimeRange;
}

const WeekPagination = (props: IWeekPaginationProps) => {
  const { changeCurrentWeek, currentWeek } = props;

  const [isNextWeekAvailable, setIsNextWeekAvailable] = useState(true);
  const [isPrevWeekAvailable, setIsPrevWeekAvailable] = useState(false);

  return (
    <div className="flex items-center justify-center gap-10">
      <button
        type="button"
        className={`focusable p-2.5 text-center text-sm font-medium text-white  ${
          !isPrevWeekAvailable ? "button-primary-disabled" : "button-primary "
        }`}
        disabled={!isPrevWeekAvailable}
        onClick={() => {
          setIsNextWeekAvailable(true);
          setIsPrevWeekAvailable(false);
          changeCurrentWeek(-1);
        }}
      >
        <AiOutlineArrowLeft size={20} />
      </button>
      <h2>
        {currentWeek.from} - {currentWeek.to}
      </h2>
      <button
        type="button"
        className={`focusable p-2.5 text-center text-sm font-medium text-white  ${
          !isNextWeekAvailable ? "button-primary-disabled" : "button-primary "
        }`}
        disabled={!isNextWeekAvailable}
        onClick={() => {
          setIsNextWeekAvailable(false);
          setIsPrevWeekAvailable(true);
          changeCurrentWeek(1);
        }}
      >
        <AiOutlineArrowRight size={20} />
      </button>
    </div>
  );
};

export default WeekPagination;
