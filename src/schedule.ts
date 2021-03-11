import KeyakiSiteSchedule from './sites/keyakizaka/keyakiSiteSchedule';
import SakuraSiteSchedule from './sites/sakurazaka/sakuraSiteSchedule';
import { SiteScheduleInterface } from './sites/siteSchedule';

export default class Schedule {
  static async setSchedule(): Promise<void> {
    const siteScheduleList: SiteScheduleInterface[] = [
      new KeyakiSiteSchedule(),
      new SakuraSiteSchedule(),
    ];
    for await (const siteSchedule of siteScheduleList) {
      await siteSchedule.setSiteSchedule();
    }
  }
}
