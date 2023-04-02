import dayjs from "dayjs";
require("dayjs/locale/pl");
dayjs.locale("pl");

export const DateFormats = {
  DateFormatWithYear: "YYYY-MM-DD",
  DateFormatWithoutYear: "DD-MM",
};

export default dayjs;
