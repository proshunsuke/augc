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
    for await (const siteSchedule of siteScheduleList) {
      await siteSchedule.setSiteSchedule(startDate);
    }
  }
}
