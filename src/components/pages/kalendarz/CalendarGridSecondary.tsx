import dayjs from "dayjs";
import React, { useState } from "react";

interface ICalendarGridProps {
  onDateSelect: ({
    day,
    timeInterval,
  }: {
    day: string;
    timeInterval: string;
  }) => void;
}

interface DateRange {
  start: string;
  end: string;
}

interface TimeRange {
  from: string;
  to: string;
}

interface FullDateToAdd {
  date: string;
  from: string;
  to: string;
}

const CalendarGridSecond = (props: ICalendarGridProps) => {
  const { onDateSelect: handleDateSelect } = props;

  const [selectedDay, setSelectedDay] = useState<Day | undefined>();
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    TimeRange | undefined
  >();

  const [selectedDates, setSelectedDates] = useState<FullDateToAdd[]>([]);

  const [currentWeek, setCurrentWeek] = useState<DateRange>({
    start: dayjs().startOf("week").format("YYYY-MM-DD"),
    end: dayjs().endOf("week").format("YYYY-MM-DD"),
  });

  const changeCurrentWeek = (weekOffset: number): void => {
    setCurrentWeek((prevState) => ({
      start: dayjs(prevState.start)
        .add(weekOffset, "week")
        .startOf("week")
        .format("YYYY-MM-DD"),
      end: dayjs(prevState.end)
        .add(weekOffset, "week")
        .endOf("week")
        .format("YYYY-MM-DD"),
    }));
  };

  return (
    <div className="justify-content-center flex flex-col items-center">
      <div className="w-9/12">
        <div className="flex justify-center gap-10 p-5">
          <button onClick={() => changeCurrentWeek(-1)}>
            &lt; Poprzedni tydzień
          </button>
          <h2>
            {currentWeek.start} - {currentWeek.end}
          </h2>
          <button onClick={() => changeCurrentWeek(1)}>
            Następny tydzień &gt;
          </button>
        </div>
        <div className="grid grid-cols-5  divide-x border  shadow-lg">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="flex flex-col">
              <div className="bg-white p-2 text-center text-blue-700">
                {day} {dayjs(currentWeek.start).day(i).format("DD/MM")}
              </div>
              <hr />
              {timeRanges.map((timeRange, j) => {
                const date = dayjs(currentWeek.start)
                  .day(i)
                  .format("DD-MM-YYYY");

                const fullDate = {
                  date,
                  from: timeRange.from,
                  to: timeRange.to,
                };

                const indexOfSelectedDate = selectedDates.findIndex(
                  (date) =>
                    date.date === fullDate.date &&
                    date.from === fullDate.from &&
                    date.to === fullDate.to
                );
                return (
                  <button
                    name={`Wizyta w ${day} od ${timeRange.from} do ${timeRange.to}`}
                    key={j}
                    className={`cursor-pointer transition-colors duration-150 ${
                      selectedDates.findIndex(
                        (date) =>
                          date.date === fullDate.date &&
                          date.from === timeRange.from &&
                          date.to === timeRange.to
                      ) !== -1
                        ? "bg-blue-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    onClick={() => {
                      if (indexOfSelectedDate === -1) {
                        setSelectedDates([...selectedDates, fullDate]);
                      } else {
                        selectedDates.splice(indexOfSelectedDate, 1);
                        setSelectedDates([...selectedDates]);
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
      <button
        onClick={() => {
          console.log(selectedDates);
        }}
      >
        check
      </button>
    </div>
  );
};

export default CalendarGridSecond;

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
