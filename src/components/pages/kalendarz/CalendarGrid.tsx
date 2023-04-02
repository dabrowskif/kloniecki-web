import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import {
  type Range,
  daysOfWeek,
  timeRanges,
  filterUnnecessaryTimeRanges,
} from "~/utils/calendar";
import dayjs, { DateFormats } from "~/utils/dayjs";

const CalendarGrid = () => {
  const ctx = api.useContext();

  const [currentWeek, setCurrentWeek] = useState<Range>({
    from: dayjs().startOf("week").format(DateFormats.DateFormatWithYear),
    to: dayjs().endOf("week").format(DateFormats.DateFormatWithYear),
  });

  const { data: availableVisitDates, isFetching } =
    api.availableVisitDate.findMany.useQuery({
      dateFrom: currentWeek.from,
      dateTo: currentWeek.to,
    });

  const { mutate: createAvailableVisitDate, isLoading: isCreating } =
    api.availableVisitDate.create.useMutation({
      onMutate: () => {
        void availableVisitDates;
      },
      onSuccess: () => {
        toast.success("Dodano datę wizyty");
      },
      onError: (e) => {
        toast.error(e.message, {
          autoClose: 1000,
        });
      },
      onSettled: () => {
        void ctx.availableVisitDate.findMany.invalidate();
      },
    });

  const { mutate: deleteAvailableVisitDate, isLoading: isDeleting } =
    api.availableVisitDate.delete.useMutation({
      onMutate: () => {
        void availableVisitDates;
      },
      onSuccess: () => {
        toast.success("Usunięto datę wizyty");
      },
      onError: (e) => {
        toast.error(e.message, {
          autoClose: 1000,
        });
      },
      onSettled: () => {
        void ctx.availableVisitDate.findMany.invalidate();
      },
    });

  const changeCurrentWeek = (weekOffset: number): void => {
    setCurrentWeek((prevState) => ({
      from: dayjs(prevState.from)
        .add(weekOffset, "week")
        .startOf("week")
        .format(DateFormats.DateFormatWithYear),
      to: dayjs(prevState.to)
        .add(weekOffset, "week")
        .endOf("week")
        .format(DateFormats.DateFormatWithYear),
    }));
  };

  return (
    <div className="justify-content-center flex flex-col items-center">
      <div className="w-9/12 ">
        <div className="flex justify-center gap-10 p-5">
          <button
            onClick={() => {
              changeCurrentWeek(-1);
            }}
          >
            &lt; Poprzedni tydzień
          </button>
          <h2>
            {currentWeek.from} - {currentWeek.to}
          </h2>
          <button
            onClick={() => {
              changeCurrentWeek(1);
            }}
          >
            Następny tydzień &gt;
          </button>
        </div>
        <div
          className={`grid grid-cols-5 divide-x border shadow-lg ${
            isFetching ? "bg-loading" : ""
          }`}
        >
          {daysOfWeek.map((day, i) => (
            <div key={i} className="flex flex-col ">
              <div className="p-2 text-center text-blue-700">
                {day}{" "}
                {dayjs(currentWeek.from)
                  .day(i + 1)
                  .format(DateFormats.DateFormatWithoutYear)}
              </div>
              <hr />
              {timeRanges.map((timeRange, j) => {
                const date = dayjs(currentWeek.from)
                  .day(i + 1)
                  .format(DateFormats.DateFormatWithYear);

                const selectedDate = {
                  date,
                  from: timeRange.from,
                  to: timeRange.to,
                };

                const availableVisitDate = availableVisitDates?.find(
                  (date) =>
                    date.date === selectedDate.date &&
                    date.from === selectedDate.from &&
                    date.to === selectedDate.to
                );

                return (
                  <button
                    name={`Wizyta w ${day} od ${timeRange.from} do ${timeRange.to}`}
                    key={j}
                    className={`cursor-pointer transition-colors duration-150 ${
                      availableVisitDate
                        ? "bg-blue-700 text-white"
                        : isFetching
                        ? "bg-loading"
                        : "bg-white text-gray-900"
                    }`}
                    disabled={isFetching || isCreating || isDeleting}
                    onClick={() => {
                      if (availableVisitDate) {
                        deleteAvailableVisitDate({ id: availableVisitDate.id });
                      } else {
                        createAvailableVisitDate(selectedDate);
                      }
                    }}
                  >
                    <div className="p-2 text-center">
                      {timeRange.from} - {timeRange.to}
                    </div>
                    <hr />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
