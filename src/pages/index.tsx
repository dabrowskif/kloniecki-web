import { type NextPage } from "next";
import Head from "next/head";
import AboutSection from "~/components/AboutSection";
import ContactSection from "~/components/ContactSection";
import Cta from "~/components/Cta";
import FaqSection from "~/components/FaqSection";
import ServicesSection from "~/components/ServicesSection";
import HeroSection from "~/components/HeroSection";
import ImageCarousel from "~/components/ImageCarousel";
import Navbar from "~/components/Navbar";
import TestimonialsSection from "~/components/TestimonialsSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Osteopatia, fizjoterapia i rehabilitacja Szymon Kloniecki Toruń"
        />
        <meta
          name="og:description"
          content="Osteopatia, fizjoterapia i rehabilitacja Szymon Kloniecki Toruń"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="osteopatia, fizjoterapia, rehabilitacja, zdrowie, ból, Toruń"
        />
        <meta name="author" content="Szymon Kloniecki" />
        <link rel="canonical" href="https://www.kloniecki.pl" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
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
      </main>
      <footer>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400.4251504538133!2d18.6096475160615!3d53.01271987991048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470335d642181bb3%3A0xf5fe495cdc1eacf7!2sKloniecki%20osteopatia%20i%20fizjoterapia!5e0!3m2!1sen!2spl!4v1680247324390!5m2!1sen!2spl"
          title="Gabinet osteopatii w Toruniu"
          width="100%"
          height="250"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </footer>
    </>
  );
};

export default Home;
