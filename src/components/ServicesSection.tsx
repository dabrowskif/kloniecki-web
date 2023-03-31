import { FaNotesMedical, FaThermometerHalf, FaUserMd } from "react-icons/fa";
import { RiPsychotherapyFill } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";

const services: { icon: JSX.Element; title: string; description: string }[] = [
  {
    icon: <FaNotesMedical className="text-4xl text-blue-700" />,
    title: "Indywidualne podejście",
    description:
      "Oferuję indywidualne podejście do każdego pacjenta, dostosowane do jego unikalnych potrzeb i schorzeń.",
  },
  {
    icon: <FaThermometerHalf className="text-4xl text-blue-700" />,
    title: "Skuteczne leczenie",
    description:
      " Terapie osteopatyczne są skuteczne w leczeniu różnych schorzeń, w tym bólu kręgosłupa, migreny i urazów sportowych.",
  },
  {
    icon: <RiPsychotherapyFill className="text-4xl text-blue-700" />,
    title: "Poprawa jakości życia",
    description:
      "Terapie osteopatyczne poprawiają jakość życia poprzez zwiększenie zakresu ruchu, zmniejszenie bólu i stresu oraz poprawę samopoczucia.",
  },
  {
    icon: <FaUserMd className="text-4xl text-blue-700" />,
    title: "Bezpieczeństwo i profesjonalizm",
    description:
      "Zapewniam pełne bezpieczeństwo i profesjonalizm w trakcie terapii.",
  },
  {
    icon: <MdHealthAndSafety className="text-4xl text-blue-700" />,
    title: "Polepszenie stanu zdrowia",
    description:
      "Osteopatia to szybka poprawa stanu zdrowia, co pozwali Tobie na szybszy powrót do normalnego funkcjonowania.",
  },
];

const ServicesSection = () => {
  return (
    <section id="uslugi" className="bg-gray-100 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-3xl font-bold md:mb-12 md:text-4xl">
          Moje usługi
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {services.map((service, i) => {
            return (
              <div
                key={service.title}
                className="col-span-4 mb-8 md:col-span-2 md:mb-0 md:px-10"
              >
                {i === 4 && <div className="col-span-1" />}
                <div data-aos="fade-down" data-aos-delay={100 * i}>
                  <div className="mb-2 flex justify-center">
                    <div className="mr-4">{service.icon}</div>
                    <h3 className="md:text2xl text-xl font-semibold">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mb-4 text-gray-600 md:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
