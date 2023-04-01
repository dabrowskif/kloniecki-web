/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Image from "next/image";
import React, { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    const heroImage = document.querySelector(".hero-image");
    window.addEventListener("scroll", () => {
      // @ts-expect-error - dont care
      heroImage.style.transform = `translateY(-${window.scrollY / 5}px)`;
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  console.log("test");

  return (
    <section id="strona-glowna">
      <div className="hero-container relative">
        <div className="relative bg-white">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                className="hero-image h-full w-full object-cover"
                width={1608}
                height={1080}
                quality={100}
                priority
                src="/osteopatia-fizjoterapia-torun.png"
                alt="Usługi Osteopatii i Fizjoterapii w Toruniu"
                title="Usługi Osteopatii i Fizjoterapii w Toruniu"
              />
            </div>
            <div className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:py-32 md:py-40 lg:px-8 lg:py-48">
              <h1
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                data-aos="fade-left"
              >
                <strong>Osteopatia</strong> i <strong>fizjoterapia</strong>
              </h1>
              <h2
                className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                data-aos="fade-left"
              >
                <strong>Szymon Kloniecki</strong>
              </h2>
              <p
                className="mt-6 max-w-3xl text-xl text-white"
                data-aos="fade-left"
                data-aos-delay="250"
              >
                Jako <strong>specjalista</strong> w dziedzinie{" "}
                <strong>osteopatii</strong> oferuję kompleksowe{" "}
                <strong>usługi zdrowotne</strong>. <br />
                Moje podejście opiera się na holistycznym podejściu, co oznacza,
                że skupiam się nie tylko na <strong>leczeniu objawów</strong>,
                ale także na znalezieniu{" "}
                <strong>przyczyny problemów zdrowotnych</strong>.
              </p>
              <div className="my-16" data-aos="fade-left" data-aos-delay="500">
                <a
                  href="#kontakt"
                  className="inline-block rounded-sm border border-transparent bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-600"
                >
                  Umów wizytę
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
