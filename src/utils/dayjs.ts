import dayjs from "dayjs";
require("dayjs/locale/pl");
dayjs.locale("pl");

export const DateFormats = {
  DateFormatWithYear: "YYYY-MM-DD",
  DateFormatWithoutYear: "DD-MM",
  GoogleCalendarApi: "YYYY-MM-DD[T]HH:mm:ss[Z]",
};

export default dayjs;
