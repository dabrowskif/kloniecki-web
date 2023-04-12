import { type calendar_v3, google } from "googleapis";
import { type OAuth2Client } from "googleapis-common";
import { env } from "~/env.mjs";
import { Calendar } from "~/utils/calendar";
import { type PrivateCalendarCell } from "~/utils/calendar/types";

export class GoogleCalendarService {
  private readonly calendar: calendar_v3.Calendar;
  // private readonly oauth2Client: OAuth2Client;

  constructor(googleAccessToken: string) {
    // this.oauth2Client = new google.auth.OAuth2(
    //   env.GOOGLE_CLIENT_ID,
    //   env.GOOGLE_CLIENT_SECRET
    // );
    this.calendar = google.calendar({
      version: "v3",
      headers: { Authorization: `Bearer ${googleAccessToken}` },
    });
  }

  getEventsWithinDateRange = async (dateFrom: Date, dateTo: Date) => {
    const events = await this.calendar.events.list({
      calendarId: "primary",
      // timeMin: dateFrom.toISOString(),
      // timeMax: dateTo.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });
    console.log(events);
    return this.convertEventsToCalendarCells(events.data.items);
  };

  private convertEventsToCalendarCells = (
    events: calendar_v3.Schema$Event[] | undefined
  ): PrivateCalendarCell[] => {
    console.log(!events);
    console.log(!events?.length);

    console.log(events);
    if (!events || events?.length === 0) return [];
    const calendarCells: PrivateCalendarCell[] = [];
    for (const event of events) {
      // if (!event.start?.date|| !event.end.date) return;
      // calendarCells.push({
      //  dateFrom: Calendar.formatDate(event.start.date, 'DateWithYear'),
      //  dateTo: event.end.date,
      //   occupation: "google_event",
      // });
    }
    return calendarCells;
  };
}
