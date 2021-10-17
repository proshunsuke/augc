import dayjs from 'dayjs';
import KeyakiSiteSchedule from './sites/keyakizaka/keyakiSiteSchedule';
import SakuraSiteSchedule from './sites/sakurazaka/sakuraSiteSchedule';
import { SiteScheduleInterface } from './sites/siteSchedule';

export default class Schedule {
  static async setSchedule(startDate: dayjs.Dayjs): Promise<void> {
    const siteScheduleList: SiteScheduleInterface[] = [
      new KeyakiSiteSchedule(),
      new SakuraSiteSchedule(),
    ];
    for (let i = 0; i < siteScheduleList.length; i++) {
      const executed = await siteScheduleList[i].setSiteSchedule(
        startDate,
        siteScheduleList[i + 1]
      );
      // スケジュール登録をした場合は即終了。しなかった場合は既に登録済みなので次のサイトのスケジュール登録に進む
      if (executed) return;
    }
  }
}
