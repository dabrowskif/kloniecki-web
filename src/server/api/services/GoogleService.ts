import { type calendar_v3, google } from "googleapis";

export class GoogleCalendarService {
  private readonly calendar: calendar_v3.Calendar;

  constructor(googleAccessToken: string) {
    this.calendar = google.calendar({
      version: "v3",
      headers: { Authorization: `Bearer ${googleAccessToken}` },
    });
  }

  getEventsWithinDateRange = async (dateFrom: Date, dateTo: Date) => {
    const events = await this.calendar.events.list({
      calendarId: "primary",
      timeMin: dateFrom.toISOString(),
      timeMax: dateTo.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return events.data.items ?? [];
  };
}
