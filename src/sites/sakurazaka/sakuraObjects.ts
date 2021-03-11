import { SiteCalendarInterface } from '../../calendarInterface';

export const getSakuraCalendarUrl =
  process.env.ENV === 'production'
    ? 'https://asia-northeast1-augc-260709.cloudfunctions.net/getSakuraSchedule?date='
    : 'http://localhost:8081?date=';

export const sakuraCalendarIds: SiteCalendarInterface[] = [
  {
    type: 'アルバム',
    calendarId: '0ivcdulcqpm0majeaqo0f1bml8@group.calendar.google.com',
  },
  {
    type: 'イベント',
    calendarId: 'ulksj6q2hr6hvvre7jqk2rghe4@group.calendar.google.com',
  },
  {
    type: 'シングル',
    calendarId: 'rf2qon3acq2g8fj1iuvngmp7tg@group.calendar.google.com',
  },
  {
    type: 'その他',
    calendarId: '06ol8jcjk0r5bviarevjicta70@group.calendar.google.com',
  },
  {
    type: 'テレビ',
    calendarId: '14elrf80nstbrahsfe2iuem8fg@group.calendar.google.com',
  },
  {
    type: 'メディア',
    calendarId: 'ivej29993ugnjb20l077n233i4@group.calendar.google.com',
  },
  {
    type: 'ラジオ',
    calendarId: 'f01lrnkgl42eqfbs1k97u7mrdc@group.calendar.google.com',
  },
  {
    type: 'リリース',
    calendarId: 'oo8hkuk4udrflu06337hq42jqo@group.calendar.google.com',
  },
  {
    type: '映画',
    calendarId: 'hbflgqvcrjvd9c1a07q5t93ork@group.calendar.google.com',
  },
  {
    type: '雑誌',
    calendarId: '2veim8rg9o7k2js0jtng8i2dug@group.calendar.google.com',
  },
  {
    type: '新聞',
    calendarId: 'g3puqreu4a67quqqu7ueo58l5k@group.calendar.google.com',
  },
  {
    type: '誕生日',
    calendarId: '02mgt618voeueel3gonuc62nrs@group.calendar.google.com',
  },
];
