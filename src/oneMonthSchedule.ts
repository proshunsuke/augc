import dayjs from 'dayjs';
import Calendar from './calendar';
import {
  ScheduleInterface,
  SiteCalendarInterface,
} from './calendarInterface';
import Retry from './lib/retry';
import 'regenerator-runtime';

export default class OneMonthSchedule {
  /**
   *
   * @param {dayjs.Dayjs} date
   * @param calendarUrl
   * @param siteCalendarIds
   * @returns {Promise<void>}
   */
  static async setSchedule(date: dayjs.Dayjs, calendarUrl: string, siteCalendarIds: SiteCalendarInterface[]): Promise<void> {
    const customUrl: string = calendarUrl + date.format('YYYYMMDD');

    const scheduleJson = await OneMonthSchedule.getScheduleJson(customUrl);

    const scheduleList = JSON.parse(scheduleJson) as ScheduleInterface[];

    console.info(`${date.format('YYYY年MM月')}分の予定を更新します`);
    OneMonthSchedule.delete1MonthCalendarEvents(date, siteCalendarIds);
    OneMonthSchedule.create1MonthEvents(scheduleList, date, siteCalendarIds);
    console.info(`${date.format('YYYY年MM月')}分の予定を更新しました`);
  }

  /**
   *
   * @param {string} customUrl
   * @returns {Promise<any>}
   * @private
   */
  private static async getScheduleJson(customUrl: string): Promise<string> {
    if (process.env.ENV === 'production') {
      return Retry.retryable<string>(3, () =>
        UrlFetchApp.fetch(customUrl).getContentText()
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,@typescript-eslint/no-unsafe-assignment
    const { fetchUrl } = require('./fetchUrl');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return await fetchUrl(customUrl);
  }

  /**
   *
   * @param {dayjs.Dayjs} date
   * @param siteCalendarIds
   */
  private static delete1MonthCalendarEvents(date: dayjs.Dayjs, siteCalendarIds: SiteCalendarInterface[]) {
    let deleteEventCallCount = 0;
    siteCalendarIds.forEach((siteCalendarId) => {
      if (process.env.ENV !== 'production') return;
      const calendarApp = Retry.retryable(3, () =>
        CalendarApp.getCalendarById(siteCalendarId.calendarId)
      );
      const targetDateBeginningOfMonth = date;
      const targetDateBeginningOfNextMonth = date.add(1, 'month');
      let targetDate = targetDateBeginningOfMonth;
      while (targetDate.isBefore(targetDateBeginningOfNextMonth)) {
        const events = calendarApp.getEventsForDay(targetDate.toDate());
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        events.forEach((event) => {
          deleteEventCallCount += 1;
          try {
            Calendar.deleteEvent(event);
          } catch (e) {
            console.error(
              `カレンダー削除に失敗しました。失敗するまでに実行された回数: ${deleteEventCallCount.toString()}`
            );
            throw e;
          }
        });
        targetDate = targetDate.add(1, 'day');
      }
    });
    console.info(
      `${date.format(
        'YYYY年MM月'
      )}分のカレンダー削除実行回数${deleteEventCallCount.toString()}`
    );
  }

  /**
   *
   * @param {ScheduleInterface[]} scheduleList
   * @param {dayjs.Dayjs} date
   * @param calendarIds
   */
  private static create1MonthEvents(
    scheduleList: ScheduleInterface[],
    date: dayjs.Dayjs,
    calendarIds: SiteCalendarInterface[]
  ) {
    let createEventCallCount = 0;
    scheduleList.forEach((schedule: ScheduleInterface) => {
      createEventCallCount += 1;
      try {
        Calendar.createEvent(schedule, calendarIds);
      } catch (e) {
        console.error(
          `カレンダー作成に失敗しました。失敗するまでに実行された回数: ${createEventCallCount.toString()}`
        );
        throw e;
      }
    });
    console.info(
      `${date.format(
        'YYYY年MM月'
      )}分のカレンダー作成実行回数: ${createEventCallCount.toString()}`
    );
  }
}
