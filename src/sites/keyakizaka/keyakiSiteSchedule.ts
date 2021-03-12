import SiteSchedule from '../siteSchedule';
import { getKeyakiCalendarUrl, keyakiCalendarIds } from './keyakiObjects';
import { SiteCalendarInterface } from '../../calendarInterface';

export default class KeyakiSiteSchedule extends SiteSchedule {
  // eslint-disable-next-line class-methods-use-this
  siteCalendarUrl(): string {
    return getKeyakiCalendarUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  siteCalendarIds(): SiteCalendarInterface[] {
    return keyakiCalendarIds;
  }

  // eslint-disable-next-line class-methods-use-this
  siteName(): string {
    return 'keyakizakai';
  }
}
