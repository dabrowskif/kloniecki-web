import { type GetServerSidePropsContext, type NextPage } from "next";
import { useSession } from "next-auth/react";
import Script from "next/script";
import React from "react";
import Footer from "~/components/general/Footer";
import Navbar from "~/components/general/Navbar";
import CalendarGrid from "~/components/pages/kalendarz/CalendarGrid";
import { getServerAuthSession } from "~/server/auth";

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
          <CalendarGrid />
          <div className="mt-20 flex justify-center">
            <button className="button-primary">Wyloguj</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
