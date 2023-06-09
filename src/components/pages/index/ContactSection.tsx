/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { api } from "~/utils/api";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    phoneNumber: "",
  });

  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const { mutate: sendInquiryForm, isLoading } = api.inquiryForm.create.useMutation({
    onSuccess: () => {
      setFormError("");
      setFormSuccess("Pomyślnie wysłano wiadomość!");
    },
    onError: () => {
      setFormSuccess("");
      setFormError("Wystąpił nieoczekiwany problem. Proszę - skontaktuj się ze mną bezpośrednio.");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendInquiryForm(formData);
  };

  const handleChange = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <section id="kontakt" className="bg-gray-100 p-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Skontaktuj się ze mną</h2>
        <p className="mt-4 text-gray-600">Wypełnij formularz kontaktowy</p>
      </div>
      <div className="grid grid-cols-1 gap-8 px-4 pt-12 sm:gap-4 sm:px-6 md:grid-cols-2 md:px-10 lg:px-20">
        <div className="flex flex-col items-center justify-center space-y-4 align-middle">
          <div className="space-y-5">
            <div className="flex items-center space-x-5">
              <FaPhoneAlt className="text-xl text-blue-700" />
              <p className="text-gray-700">+48 781-624-414</p>
            </div>
            <div className="flex items-center space-x-5">
              <FaEnvelope className="text-xl text-blue-700" />
              <p className="text-gray-700">sz.kloniecki@gmail.com</p>
            </div>
            <div className="flex items-center space-x-5">
              <FaMapMarkerAlt className="text-xl text-blue-700" />
              <div>
                <p className="text-gray-700">ul. św. Katarzyny 3 m. 5a</p>
                <p className="text-gray-700">87-100 Toruń, Polska</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4 pt-5 md:items-center md:pt-0">
          <form onSubmit={handleSubmit} className="w-full md:w-9/12">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 mb-6 sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="twoj@email.com"
                  required
                />
              </div>
              <div className="col-span-2 mb-6 sm:col-span-1">
                <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Numer telefonu
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  onChange={handleChange}
                  name="phoneNumber"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="+48 500 500 500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Wiadomość *
              </label>
              <textarea
                id="message"
                rows={3}
                name="message"
                required
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Zostaw wiadomość"
              ></textarea>
            </div>
            <button type="submit" disabled={isLoading} className="button-primary mt-2 px-5">
              {isLoading ? (
                <div className="flex">
                  <svg
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                  <span>Wysyłanie...</span>
                </div>
              ) : (
                "Wyślij"
              )}
            </button>
          </form>
          {formSuccess && <div className="text-green-400">{formSuccess}</div>}
          {formError && <div className="text-red-600">{formError}</div>}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
