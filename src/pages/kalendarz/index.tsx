import { type GetServerSidePropsContext, type NextPage } from "next";
import { useSession } from "next-auth/react";
import Script from "next/script";
import React from "react";
import Footer from "~/components/general/Footer";
import Navbar from "~/components/general/Navbar";
import CalendarGridSecond from "~/components/pages/kalendarz/CalendarGridSecondary";
import { getServerAuthSession } from "~/server/auth";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/kalendarz/zaloguj",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Calendar: NextPage = () => {
  const { data, status } = useSession();

  const hanndleDateSelect = (value: any) => {
    console.log(value);
  };
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
          <h2 className="sm:text-1xl my-10 text-center text-lg tracking-tight md:text-2xl lg:text-3xl">
            Najnwosze zapytania
          </h2>
          <CalendarGridSecond onDateSelect={hanndleDateSelect} />
          <div className="mt-20 flex justify-center">
            <button className="button-primary">Wyloguj</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Calendar;
