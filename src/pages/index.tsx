import { type NextPage } from "next";
import Head from "next/head";
import AboutSection from "~/components/pages/index/AboutSection";
import ContactSection from "~/components/pages/index/ContactSection";
import Cta from "~/components/pages/index/Cta";
import FaqSection from "~/components/pages/index/FaqSection";
import HeroSection from "~/components/pages/index/HeroSection";
import ImageCarousel from "~/components/pages/index/ImageCarousel";
import ServicesSection from "~/components/pages/index/ServicesSection";
import TestimonialsSection from "~/components/pages/index/TestimonialsSection";
import Navbar from "~/components/general/Navbar";
import CalendarSection from "~/components/pages/index/CalendarSection/CalendarSection";
import Footer from "~/components/general/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Osteopatia, fizjoterapia i rehabilitacja Szymon Kloniecki Toruń" />
        <meta name="og:description" content="Osteopatia, fizjoterapia i rehabilitacja Szymon Kloniecki Toruń" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="osteopatia, fizjoterapia, rehabilitacja, zdrowie, ból, Toruń" />
        <meta name="author" content="Szymon Kloniecki" />
        <link rel="canonical" href="https://www.kloniecki.pl" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css" rel="stylesheet" />

        <title>Kloniecki Ostopatia i Fizjoterapia Toruń</title>
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <Cta />
        <TestimonialsSection />
        <ImageCarousel />
        <FaqSection />
        <ContactSection />
        <CalendarSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
