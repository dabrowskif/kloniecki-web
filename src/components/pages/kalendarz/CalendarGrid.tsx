import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGoogleCalendarApiClient } from "~/client/clients/googleCalendarClient";
import { api } from "~/utils/api";
import {
  daysOfWeek,
  timeRanges,
  filterUnnecessaryTimeRanges,
  type TimeRange,
} from "~/utils/calendar";
import dayjs, { DateFormats } from "~/utils/dayjs";

const CalendarGrid = () => {
  const ctx = api.useContext();
  const { data, status } = useSession();
  const googleCalendarApiClient = useGoogleCalendarApiClient();

  const [currentWeek, setCurrentWeek] = useState<TimeRange>({
    from: dayjs().startOf("week").format(DateFormats.DateFormatWithYear),
    to: dayjs().endOf("week").format(DateFormats.DateFormatWithYear),
  });

  const [googleCalendarEvents, setGoogleCalendarEvents] = useState<any>([]);

  const { data: availableVisitDates, isFetching } =
    api.availableVisitDate.findMany.useQuery({
      dateFrom: currentWeek.from,
      dateTo: currentWeek.to,
      shouldIncludeReservedDates: true,
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

  useEffect(() => {
    if (
      data &&
      status === "authenticated" &&
      googleCalendarApiClient !== undefined
    ) {
      console.log(data?.user.google_access_token);
      const timeMin = dayjs()
        .startOf("week")
        .format(DateFormats.GoogleCalendarApi);
      const timeMax = dayjs()
        .endOf("week")
        .format(DateFormats.GoogleCalendarApi);
      void googleCalendarApiClient
        .get(`/events?timeMin=${timeMin}&timeMax=${timeMax}`, {
          headers: {
            Authorization: `Bearer ${data?.user.google_access_token ?? ""}`,
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .then((res) => setGoogleCalendarEvents(res.data?.items));
    }
  }, [status, data, googleCalendarApiClient]);
  console.log(googleCalendarEvents);
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
            <div key={i} className="flex flex-col">
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

                const mappedEvents = googleCalendarEvents?.map((event: any) => {
                  return {
                    start: event?.start?.dateTime,
                    end: event?.start?.dateTime,
                    summary: event?.summary,
                  };
                });

                const start = mappedEvents[0]?.start;
                const gDate = dayjs(start).format("YYYY-MM-DD");
                const end = mappedEvents[0]?.end;
                const startTime = dayjs(start).format("HH:mm");
                const endTime = dayjs(end).format("HH:mm");

                console.log(gDate, startTime, endTime);
                console.log(availableVisitDate);
                return (
                  <button
                    name={`Wizyta w ${day} od ${timeRange.from} do ${timeRange.to}`}
                    key={j}
                    className={`transition-colors duration-150 ${
                      selectedDate.date === gDate &&
                      (selectedDate?.from === startTime ||
                        selectedDate?.to === endTime)
                        ? "bg-red-500 text-gray-900"
                        : availableVisitDate?.visitReservation?.id
                        ? "bg-green-400 text-white"
                        : availableVisitDate
                        ? "bg-blue-700 text-white"
                        : isFetching
                        ? "bg-loading"
                        : "bg-white text-gray-900"
                    }`}
                    disabled={
                      isFetching ||
                      isCreating ||
                      isDeleting ||
                      availableVisitDate?.visitReservation?.id !== undefined
                    }
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
