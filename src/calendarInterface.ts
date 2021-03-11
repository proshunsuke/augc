export interface ScheduleInterface {
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  type: string;
}

export interface SiteCalendarInterface {
  type: string;
  calendarId: string;
}
