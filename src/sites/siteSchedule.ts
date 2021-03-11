import dayjs from 'dayjs';
import OneMonthSchedule from '../oneMonthSchedule';
import Trigger, { TERMINATION_MINUTES } from '../lib/trigger';
import {SiteCalendarInterface} from '../calendarInterface';

export interface SiteScheduleInterface {
  setSiteSchedule(): Promise<void>;
  siteCalendarUrl(): string;
  siteCalendarIds(): SiteCalendarInterface[];
}

export default abstract class SiteSchedule implements SiteScheduleInterface{
  async setSiteSchedule(): Promise<void> {
    const beginningOfNexYearMonth = dayjs().startOf('month').add(1, 'year');
    let targetBeginningOfMonth = SiteSchedule.getTargetBeginningOfMonth();
    const startDate = dayjs();

    while (targetBeginningOfMonth.isBefore(beginningOfNexYearMonth)) {
      // eslint-disable-next-line no-await-in-loop
      await OneMonthSchedule.setSchedule(targetBeginningOfMonth, this.siteCalendarUrl(), this.siteCalendarIds());
      targetBeginningOfMonth = targetBeginningOfMonth.add(1, 'month');
      if (Trigger.hasExceededTerminationMinutes(startDate)) {
        Trigger.setTrigger(targetBeginningOfMonth);
        console.info(
          `${TERMINATION_MINUTES}分以上経過したので次のトリガーをセットして終了します。次実行開始する月: ${targetBeginningOfMonth.format(
            'YYYY-MM-DD'
          )}`
        );
        return;
      }
    }
    Trigger.deleteTargetDateProperty();
    Trigger.deleteTriggers();
  }

  /**
   *
   * @returns {dayjs.Dayjs}
   */
  private static getTargetBeginningOfMonth(): dayjs.Dayjs {
    const targetDateStr: string | null = Trigger.getTargetDateProperty();
    return targetDateStr
      ? dayjs(targetDateStr).startOf('month')
      : dayjs().startOf('month');
  }

  abstract siteCalendarUrl(): string;

  abstract siteCalendarIds(): SiteCalendarInterface[];
}

