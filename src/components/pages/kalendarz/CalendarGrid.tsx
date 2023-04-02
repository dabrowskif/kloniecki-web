import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import dayjs, { DateFormats } from "~/utils/dayjs";

interface DateRange {
  start: string;
  end: string;
}

const CalendarGrid = () => {
  const ctx = api.useContext();

  const [currentWeek, setCurrentWeek] = useState<DateRange>({
    start: dayjs().startOf("week").format(DateFormats.DateFormatWithYear),
    end: dayjs().endOf("week").format(DateFormats.DateFormatWithYear),
  });

  const { data: availableVisitDates, isFetching } =
    api.availableVisitDate.findMany.useQuery({
      dateFrom: currentWeek.start,
      dateTo: currentWeek.end,
    });

  const { mutate: createAvailableVisitDate } =
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

  const { mutate: deleteAvailableVisitDate, isLoading } =
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
      start: dayjs(prevState.start)
        .add(weekOffset, "week")
        .startOf("week")
        .format(DateFormats.DateFormatWithYear),
      end: dayjs(prevState.end)
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
            {currentWeek.start} - {currentWeek.end}
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
            isLoading ? "bg-loading" : ""
          }`}
        >
          {daysOfWeek.map((day, i) => (
            <div key={i} className="flex flex-col ">
              <div className="p-2 text-center text-blue-700">
                {day}{" "}
                {dayjs(currentWeek.start)
                  .day(i + 1)
                  .format(DateFormats.DateFormatWithoutYear)}
              </div>
              <hr />
              {timeRanges.map((timeRange, j) => {
                const date = dayjs(currentWeek.start)
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
                        : isLoading
                        ? "bg-loading"
                        : "bg-white text-gray-900"
                    }`}
                    disabled={isLoading}
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

export type Day = "Poniedziałek" | "Wtorek" | "Środa" | "Czwartek" | "Piątek";

const daysOfWeek: Day[] = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
];

const timeRanges = [
  {
    from: "8:30",
    to: "9:00",
  },
  {
    from: "9:00",
    to: "9:30",
  },
  {
    from: "9:30",
    to: "10:00",
  },
  {
    from: "10:00",
    to: "10:30",
  },
  {
    from: "10:30",
    to: "11:00",
  },
  {
    from: "11:00",
    to: "11:30",
  },
  {
    from: "11:30",
    to: "12:00",
  },
  {
    from: "12:00",
    to: "12:30",
  },
  {
    from: "12:30",
    to: "13:00",
  },
  {
    from: "13:00",
    to: "13:30",
  },
  {
    from: "13:30",
    to: "14:00",
  },
  {
    from: "14:00",
    to: "14:30",
  },
  {
    from: "14:30",
    to: "15:00",
  },
  {
    from: "15:00",
    to: "15:30",
  },
  {
    from: "15:30",
    to: "16:00",
  },
  {
    from: "16:00",
    to: "16:30",
  },
  {
    from: "16:30",
    to: "17:00",
  },
  {
    from: "17:00",
    to: "17:30",
  },
];
