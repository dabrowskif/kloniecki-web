const AboutSection = () => {
  return (
    <section id="o-mnie bg-white">
      <div className="mx-auto mb-20 mt-10 max-w-7xl px-5">
        <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
          <div data-aos="fade-up">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Czym jest osteopatia?</h2>
            <p className="mt-3 text-lg text-gray-500">
              Osteopatia to forma medycyny alternatywnej, która kładzie nacisk na fizyczną manipulację tkanki mięśniowej i kości ciała. Jest
              stosowana w leczeniu różnych chorób, takich jak ból pleców, zapalenie stawów czy bóle głowy.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 md:mt-0" data-aos="fade-up">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">O mnie</h2>
            <p className="mt-3 text-lg text-gray-500">
              Nazywam się Szymon Kloniecki i licencjonowany osteopata z ponad 5-letnim doświadczeniem. Specjalizuję się w leczeniu urazów
              sportowych i bólu przewlekłego, a moją pasją jest pomaganie moim pacjentom w osiągnięciu jak najlepszego zdrowia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
