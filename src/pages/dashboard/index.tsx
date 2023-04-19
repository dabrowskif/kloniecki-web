import { type GetServerSidePropsContext, type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import CalendarPagination from "~/components/calendars/CalendarPagination";
import PrivateCalendar from "~/components/calendars/privateCalendar/PrivateCalendar";
import Footer from "~/components/general/Footer";
import Navbar from "~/components/general/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type PrivateCalendarCell, type DateRange, type VisitsCalendar } from "~/utils/calendar/types";

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
  const [currentWeek, setCurrentWeek] = useState<DateRange>({
    from: Calendar.getWeekStartDate(),
    to: Calendar.getWeekEndDate(),
  });
  const [calendarColumns, setCalendarColumns] = useState<VisitsCalendar<PrivateCalendarCell>>([]);

  const { data: privateCalendarData, isFetching } = api.calendar.getPrivateCalendar.useQuery({
    weekStartDate: currentWeek.from,
    weekEndDate: currentWeek.to,
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
        <div className="flex flex-col items-center p-10">
          <h1 className="text-center text-xl tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
            Witaj w panelu zarządzania Kalendarzem Google
          </h1>
          <h2 className="sm:text-1xl my-10 text-center text-lg tracking-tight md:text-2xl lg:text-3xl">Twój kalendarz</h2>
          <div className="">
            <CalendarPagination currentWeek={currentWeek} changeCurrentWeek={changeCurrentWeek} />
            <hr className="my-5  border-blue-500" />
            <PrivateCalendar calendarColumns={calendarColumns} />
            <div className="mt-20 flex justify-center">
              <button className="button-primary px-10" onClick={() => void signOut()}>
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
