import KeyakiSiteSchedule from './sites/keyakizaka/keyakiSiteSchedule';
import { SiteScheduleInterface } from './sites/siteSchedule';

export default class Schedule {
  static async setSchedule(): Promise<void> {
    const siteScheduleList: SiteScheduleInterface[] = [
      new KeyakiSiteSchedule(),
      // new KeyakiSiteSchedule
    ];
    for await (const siteSchedule of siteScheduleList) {
      await siteSchedule.setSiteSchedule();
    }
  }
}
