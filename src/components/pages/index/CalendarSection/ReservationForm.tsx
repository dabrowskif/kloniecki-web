import { useState } from "react";
import { api } from "~/utils/api";
import { Calendar } from "~/utils/calendar";
import { type PublicCalendarCell } from "~/utils/calendar/types";

interface IReservationFormProps {
  selectedCell: PublicCalendarCell | undefined;
}

const ReservationForm = (props: IReservationFormProps) => {
  const { selectedCell } = props;
  const ctx = api.useContext();
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const { mutate: createVisitReservation, isLoading: isSubmitting } = api.visitReservation.create.useMutation({
    onSuccess: () => {
      setFormError("");
      setFormSuccess("Pomyślnie zarezerowano! Proszę, oczekuj wiadomości potwierdzającej rezerwację.");
      void ctx.calendar.getPublicCalendar.invalidate();
    },
    onError: (e) => {
      setFormSuccess("");
      setFormError(e.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCell) return;
    createVisitReservation({
      ...formData,
      dateFrom: selectedCell.dateFrom,
      dateTo: selectedCell.dateTo,
    });
  };

  const handleChange = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    phoneNumber: "",
    name: "",
  });

  return (
    <div className="mt-10 flex justify-center">
      <form onSubmit={handleSubmit} className="md:9/12 mb-5 w-full lg:w-7/12">
        <div className="grid grid-cols-2 gap-1 md:gap-3">
          <div className="col-span-2 mb-6 md:col-span-1">
            <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Imię i nazwisko *
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              name="name"
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Imię i nazwisko"
            />
          </div>
          <div className="col-span-2 mb-6 md:col-span-1">
            <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Numer telefonu *
            </label>
            <input
              type="text"
              id="phoneNumber"
              onChange={handleChange}
              name="phoneNumber"
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="+48 500 500 500"
            />
          </div>
          <div className="col-span-2 mb-6 md:col-span-1">
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
          <div className="col-span-2 mb-6 md:col-span-1">
            <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Data *
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={
                selectedCell
                  ? `${Calendar.formatDate(selectedCell.dateFrom, "DateWithYear")} od ${Calendar.getHourOfDate(
                      selectedCell.dateFrom
                    )} do ${Calendar.getHourOfDate(selectedCell.dateTo)}`
                  : ""
              }
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={() => {}}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Dodatkowe informacje
          </label>
          <textarea
            id="message"
            rows={3}
            name="message"
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Dodatkowe informacje..."
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="button-primary mt-5 px-20">
          {isSubmitting ? (
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
            "Zarezerwuj"
          )}
        </button>
      </form>
      {formSuccess && <div className="text-green-400">{formSuccess}</div>}
      {formError && <div className="text-red-600">{formError}</div>}
    </div>
  );
};

export default ReservationForm;
