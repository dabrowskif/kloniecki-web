import axios from "axios";

const googleCalendarApiClient = axios.create({
  baseURL: "https://www.googleapis.com/calendar/v3/calendars/primary",
});

export const useGoogleCalendarApiClient = () => googleCalendarApiClient;
