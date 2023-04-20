const Cta = () => {
  return (
    <section>
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Chcesz zadbać o swoje zdrowie?</h2>
            <p className="mt-4 text-lg text-gray-300">Umów się na pierwszą wizytę i zacznij czuć się lepiej!</p>
            <div className="mt-8 flex justify-center">
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
    </section>
  );
};

export default Cta;
