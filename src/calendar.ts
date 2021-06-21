import { ScheduleInterface, SiteCalendarInterface } from './calendarInterface';
import Retry from './lib/retry';
import Counter from './lib/counter';

export default class Calendar {
  /**
   *
   * @param {GoogleAppsScript.Calendar.CalendarEvent} event
   */
  static deleteEvent(event: GoogleAppsScript.Calendar.CalendarEvent): void {
    Retry.retryable(3, () => {
      event.deleteEvent();
    });
    const counter = Counter.getInstance;
    counter.incrementDeleteEventCallCount();
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
    const args = this.createEventArgs(schedule);
    Retry.retryable(3, () => {
      if (process.env.ENV !== 'production') return;
      if (schedule.startTime && schedule.endTime) {
        CalendarApp.getCalendarById(calendarId).createEvent(
          ...(args as [string, Date, Date, { [key: string]: unknown }])
        );
      } else {
        CalendarApp.getCalendarById(calendarId).createAllDayEvent(
          ...(args as [string, Date, { [key: string]: unknown }])
        );
      }
    });
    const counter = Counter.getInstance;
    counter.incrementCreateEventCallCount();
    console.info('予定を作成しました。', args);
    if (process.env.ENV === 'production') {
      Utilities.sleep(500); // API制限に引っかかってそうなのでsleepする
    }
  }

  /**
   *
   * @param {ScheduleInterface} schedule
   * @returns {(string | Date | {description: string | undefined})[]}
   * @private
   */
  private static createEventArgs(
    schedule: ScheduleInterface
  ): (string | Date | { description: string | undefined })[] {
    if (schedule.startTime && schedule.endTime) {
      return [
        schedule.title,
        new Date(schedule.startTime),
        new Date(schedule.endTime),
        { description: schedule.description },
      ];
    }
    return [
      schedule.title,
      new Date(schedule.date),
      { description: schedule.description },
    ];
  }
}
