import { ScheduleInterface, SiteCalendarInterface } from './calendarInterface';
import Retry from './lib/retry';

export default class Calendar {
  /**
   *
   * @param {GoogleAppsScript.Calendar.CalendarEvent} event
   */
  static deleteEvent(event: GoogleAppsScript.Calendar.CalendarEvent): void {
    Retry.retryable(3, () => {
      event.deleteEvent();
    });
    if (process.env.ENV === 'production') {
      Utilities.sleep(500); // API制限に引っかかってそうなのでsleepする
    }
  }

  /**
   *
   * @param {ScheduleInterface} schedule
   * @param calendarIds
   */
  static createEvent(
    schedule: ScheduleInterface,
    calendarIds: SiteCalendarInterface[]
  ): void {
    const siteCalendarId: SiteCalendarInterface | undefined = calendarIds.find(
      (id) => id.type === schedule.type
    );
    if (typeof siteCalendarId === 'undefined') {
      console.info('スケジュールの内容: ');
      console.info(schedule);
      throw new Error(
        `存在しない種類のスケジュールです。type: ${schedule.type}`
      );
    }
    const { calendarId } = siteCalendarId;
    Retry.retryable(3, () => {
      if (process.env.ENV !== 'production') return;
      if (schedule.startTime && schedule.endTime) {
        CalendarApp.getCalendarById(calendarId).createEvent(
          schedule.title,
          new Date(schedule.startTime),
          new Date(schedule.endTime),
          { description: schedule.description }
        );
      } else {
        CalendarApp.getCalendarById(calendarId).createAllDayEvent(
          schedule.title,
          new Date(schedule.date),
          { description: schedule.description }
        );
      }
    });
    console.info(
      `予定を作成しました。日付: ${schedule.date}, タイトル: ${schedule.title}`
    );
    if (process.env.ENV === 'production') {
      Utilities.sleep(500); // API制限に引っかかってそうなのでsleepする
    }
  }
}
