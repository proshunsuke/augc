import dayjs from 'dayjs';
import KeyakiSchedule from './keyakizaka/keyakiSchedule';
import Trigger, { TERMINATION_MINUTES } from './lib/trigger';

export default class Schedule {
  static async setSchedule(): Promise<void> {
    const beginningOfNexYearMonth = dayjs().startOf('month').add(1, 'year');
    let targetBeginningOfMonth = Schedule.getTargetBeginningOfMonth();
    const startDate = dayjs();

    while (targetBeginningOfMonth.isBefore(beginningOfNexYearMonth)) {
      // eslint-disable-next-line no-await-in-loop
      await KeyakiSchedule.setSchedule(targetBeginningOfMonth);
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
}
