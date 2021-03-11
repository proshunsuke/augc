import {SiteCalendarInterface} from '../../calendarInterface';

export const getKeyakiCalendarUrl =
  process.env.ENV === 'production'
    ? 'https://us-central1-augc-260709.cloudfunctions.net/getKeyakiSchedule?date='
    : 'http://localhost:8080?date=';

export const keyakiCalendarIds: SiteCalendarInterface[] = [
  {
    type: 'shakehands',
    calendarId: 'jdnc8uf21242be7qjm5nmj7uok@group.calendar.google.com',
  },
  {
    type: 'event',
    calendarId: 'eh0boh68ai7r2v15m38k2ms1lg@group.calendar.google.com',
  },
  {
    type: 'goods',
    calendarId: '8l4srrnd9c6vge51k6cclsdsmc@group.calendar.google.com',
  },
  {
    type: 'release',
    calendarId: '8tc88j0j9gmr95qa81r8t2210c@group.calendar.google.com',
  },
  {
    type: 'ticket',
    calendarId: 'f4bcp8sqv66sugk9m06gb1ioeg@group.calendar.google.com',
  },
  {
    type: 'media',
    calendarId: '9beck0tqd2096b3b5utkh0jg8g@group.calendar.google.com',
  },
  {
    type: 'birthday',
    calendarId: 'lihum5fsldhsspa3r8altr01ns@group.calendar.google.com',
  },
  {
    type: 'other',
    calendarId: 'efhfvac7iii073suf8v16tlmic@group.calendar.google.com',
  },
];
