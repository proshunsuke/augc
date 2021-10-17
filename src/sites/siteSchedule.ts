import dayjs from 'dayjs';
import OneMonthSchedule from '../oneMonthSchedule';
import Trigger, { TERMINATION_MINUTES } from '../lib/trigger';
import { SiteCalendarInterface } from '../calendarInterface';

export interface SiteScheduleInterface {
  setSiteSchedule(
    startDate: dayjs.Dayjs,
    nextSiteSchedule?: SiteScheduleInterface
  ): Promise<boolean>;

  siteCalendarUrl(): string;

  siteCalendarIds(): SiteCalendarInterface[];

  siteName(): string;
}

export default abstract class SiteSchedule implements SiteScheduleInterface {
  /**
   * スケジュール登録をした場合はtrue, しなかった場合はfalseを返す
   *
   * @param {dayjs.Dayjs} startDate
   * @param nextSiteSchedule
   * @returns {Promise<boolean>}
   */
  async setSiteSchedule(
    startDate: dayjs.Dayjs,
    nextSiteSchedule?: SiteScheduleInterface
  ): Promise<boolean> {
    if (!this.doesExecute()) return false;
    console.info(`${this.siteName()}の予定を更新します`);
    const beginningOfNexYearMonth = dayjs().startOf('month').add(1, 'year');
    let targetBeginningOfMonth = SiteSchedule.getTargetBeginningOfMonth();

    while (targetBeginningOfMonth.isBefore(beginningOfNexYearMonth)) {
      // eslint-disable-next-line no-await-in-loop
      await OneMonthSchedule.setSchedule(
        targetBeginningOfMonth,
        this.siteCalendarUrl(),
        this.siteCalendarIds()
      );
      targetBeginningOfMonth = targetBeginningOfMonth.add(1, 'month');
      if (Trigger.hasExceededTerminationMinutes(startDate)) {
        Trigger.setTrigger(targetBeginningOfMonth, this.siteName());
        console.info(
          `${TERMINATION_MINUTES}分以上経過したので次のトリガーをセットして終了します。次実行開始する月: ${targetBeginningOfMonth.format(
            'YYYY-MM-DD'
          )}, 次実行するサイト: ${this.siteName()}`
        );
        return true;
      }
    }

    if (nextSiteSchedule) {
      const thisMonth = dayjs().startOf('month');
      Trigger.setTrigger(thisMonth, nextSiteSchedule.siteName());
      console.info(
        `${this.siteName()}の全てのスケジュール作成が完了したので次のトリガーをセットして終了します。次実行開始する月: ${thisMonth.format(
          'YYYY-MM-DD'
        )}, 次実行するサイト: ${nextSiteSchedule.siteName()}`
      );
      return true;
    }

    Trigger.deleteTargetDateProperty();
    Trigger.deleteTargetSiteNameProperty();
    Trigger.deleteTriggers();

    return true;
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

  /**
   *
   * @returns {boolean}
   * @private
   */
  private doesExecute() {
    const siteNameProperty = Trigger.getTargetSiteNameProperty();
    return !siteNameProperty || siteNameProperty === this.siteName();
  }

  abstract siteCalendarUrl(): string;

  abstract siteCalendarIds(): SiteCalendarInterface[];

  abstract siteName(): string;
}
