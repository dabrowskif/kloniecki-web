import { Accordion } from "flowbite-react";

const FaqSection = () => {
  return (
    <section id="faq">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <Accordion flush>
            <Accordion.Panel color="red">
              <Accordion.Title>Czym jest osteopatia?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Osteopatia to holistyczne podejście do zdrowia, które skupia
                  się na układzie mięśniowo-szkieletowym i ma na celu poprawę
                  naturalnej zdolności organizmu do samouzdrawiania.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Jakie choroby można leczyć osteopatią?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Osteopatia może być stosowana do leczenia różnych schorzeń, w
                  tym bólu pleców, bólu szyi, bólów głowy, bólu stawów i urazów
                  mięśniowo-szkieletowych.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Czym osteopatia różni się od chiropraktyki?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Osteopatia i chiropraktyka skupiają się na układzie
                  mięśniowo-szkieletowym, ale mają różne podejścia i techniki.
                  Osteopatia to podejście bardziej holistyczne, które uwzględnia
                  całe ciało i wykorzystuje różne techniki, podczas gdy
                  chiropraktyka skupia się głównie na manipulacji kręgosłupa.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>Czy osteopatia jest bezpieczna?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Tak, osteopatia jest bezpieczna, gdy wykonywana jest przez
                  wykwalifikowanego i licencjonowanego specjalistę.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Ile sesji osteopatycznych będę potrzebować?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Liczba sesji osteopatycznych, jakie będą potrzebne, zależy od
                  natury i nasilenia Twojego schorzenia. Będę pracował z Tobą,
                  aby opracować plan leczenia, który będzie dopasowany do Twoich
                  indywidualnych potrzeb.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
