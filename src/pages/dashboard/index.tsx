import { type GetServerSidePropsContext, type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

import Script from "next/script";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CalendarPagination from "~/components/calendars/CalendarPagination";
import PrivateCalendar from "~/components/calendars/privateCalendar/PrivateCalendar";
import PublicCalendar from "~/components/calendars/publicCalendar/PublicCalendar";
import Footer from "~/components/general/Footer";
import Navbar from "~/components/general/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import {
  type ColumnCell,
  type DateRange,
  type VisitsCalendar,
} from "~/utils/calendar/types";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/dashboard/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Dashboard: NextPage = () => {
  const ctx = api.useContext();
  const [currentWeek, setCurrentWeek] = useState<DateRange>({
    from: Calendar.getWeekStartDate(),
    to: Calendar.getWeekEndDate(),
  });
  const [calendarColumns, setCalendarColumns] = useState<VisitsCalendar>([]);
  // const [selectedReservationDate, setSelectedReservationDate] = useState<{
  //   dateFrom: Date;
  //   dateTo: Date;
  // }>();
  const { data: privateCalendarData, isFetching } =
    api.calendar.getPrivateCalendar.useQuery({
      weekStartDate: currentWeek.from,
      weekEndDate: currentWeek.to,
    });

  const { mutate: createAvailableVisitDate, isLoading: isCreating } =
    api.availableVisit.create.useMutation({
      onSuccess: () => {
        toast.success("Dodano datę wizyty");
        void ctx.calendar.getPrivateCalendar.invalidate();
      },
      onError: (e) => {
        toast.error(e.message, {
          autoClose: 1000,
        });
      },
    });

  const changeCurrentWeek = (weekOffset: number): void => {
    setCurrentWeek((prevState) => ({
      from: Calendar.changeWeek(prevState.from, weekOffset, "week_start"),
      to: Calendar.changeWeek(prevState.to, weekOffset, "week_end"),
    }));
  };

  useEffect(() => {
    if (!isFetching && privateCalendarData) {
      setCalendarColumns(privateCalendarData);
    }
  }, [isFetching, privateCalendarData]);

  return (
    <>
      <Navbar />
      <main className="mt-20 min-h-screen">
        <div className="flex flex-col justify-center p-10">
          <h1 className="text-center text-xl tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
            Witaj w panelu zarządzania Kalendarzem Google
          </h1>
          <h2 className="sm:text-1xl mt-10 text-center text-lg tracking-tight md:text-2xl lg:text-3xl">
            Twój kalendarz
          </h2>
          <CalendarPagination
            currentWeek={currentWeek}
            changeCurrentWeek={changeCurrentWeek}
          />
          <PrivateCalendar calendarColumns={calendarColumns} />
          <div className="mt-20 flex justify-center">
            <button
              className="button-primary px-10"
              onClick={() => void signOut()}
            >
              Wyloguj
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
