import { FaQuoteLeft } from "react-icons/fa";

const TestimonialsSection = () => {
  return (
    <section id="opinie">
      <div className="bg-gray-100 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Co mówią moi klienci
            </h2>
            <p className="mt-4 text-gray-600">Zobacz opinie z Google Reviews</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div
              className="h-full rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:transform"
              data-aos="flip-left"
            >
              <div className="flex h-full flex-col justify-between px-6 py-8">
                <div className="mb-4 text-gray-600">
                  <FaQuoteLeft className="mb-1 mr-2 inline-block text-xl text-blue-700" />
                  Fizjoterapeuta, który zna się na wykonywanym przez siebie
                  zawodzie! Pomógł mi wyleczyć kontuzje nadgarstka zaledwie w
                  dwie wizyty! Serdecznie polecam i nie wyobrażam sobie chodzić
                  do kogoś innego ✌🏻
                </div>
                <div className="flex items-center">
                  <img
                    className="mr-4 h-10 w-10 rounded-full"
                    src="https://lh3.googleusercontent.com/a-/ACB-R5TrRMXPNatF6uUhTmDUlBsk_fNT6Cwk9f2Jwd2-Lg=w72-h72-p-c0x00000000-rp-mo-br100"
                    alt="Avatar"
                  />
                  <div className="text-sm">
                    <p className="leading-none text-gray-900">Filip</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="h-full rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:transform"
              data-aos="flip-left"
              data-aos-delay={300}
            >
              <div className="flex h-full flex-col justify-between px-6 py-8">
                <div className="mb-4 text-gray-600">
                  <FaQuoteLeft className="mb-1 mr-2 inline-block text-xl text-blue-700" />
                  Naprawdę polecam, szybkie efekty, szybki termin a i ceny nie
                  wygórowane :)
                </div>
                <div className="flex items-center">
                  <img
                    className="mr-4 h-10 w-10 rounded-full"
                    src="https://lh3.googleusercontent.com/a/AGNmyxYH5U9DS7bmI1D4q6G8Q5gOmPzoac3jpCpJD5uc=w72-h72-p-c0x00000000-rp-mo-br100"
                    alt="Avatar"
                  />
                  <div className="text-sm">
                    <p className="leading-none text-gray-900">Paulina</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
