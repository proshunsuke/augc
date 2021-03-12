import SiteSchedule from '../siteSchedule';
import { getSakuraCalendarUrl, sakuraCalendarIds } from './sakuraObjects';
import { SiteCalendarInterface } from '../../calendarInterface';

export default class SakuraSiteSchedule extends SiteSchedule {
  // eslint-disable-next-line class-methods-use-this
  siteCalendarUrl(): string {
    return getSakuraCalendarUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  siteCalendarIds(): SiteCalendarInterface[] {
    return sakuraCalendarIds;
  }

  // eslint-disable-next-line class-methods-use-this
  siteName(): string {
    return 'sakurazakai';
  }
}
