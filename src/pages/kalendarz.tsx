import { type NextPage } from "next";
import Script from "next/script";
import React from "react";
import Footer from "~/components/general/Footer";
import Navbar from "~/components/general/Navbar";

const Callendar: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className="mt-20 h-screen">test</main>
      <Footer />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js" />
    </>
  );
};

export default Callendar;
