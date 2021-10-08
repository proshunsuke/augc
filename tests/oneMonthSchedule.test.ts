import dayjs from 'dayjs';
import fetchMock from 'jest-fetch-mock';
import OneMonthSchedule from '../src/oneMonthSchedule';
import Calendar from '../src/calendar';
import {
  getKeyakiCalendarUrl,
  keyakiCalendarIds,
} from '../src/sites/keyakizaka/keyakiObjects';

function getScheduleJson() {
  return '[{"title":"欅坂46 こちら有楽町星空放送局","start":"2019-12-01","className":"media","description":"欅坂46 こちら有楽町星空放送局"},{"title":"テレビ東京「欅って、書けない?」","start":"2019-12-01","className":"media","description":"テレビ東京「欅って、書けない?」"}]';
}

jest.mock('../src/calendar');
describe('setSchedule', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
    jest.resetAllMocks();
    process.env = { ...OLD_ENV };
    fetchMock.doMock();
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });
  it('dayjsのインスタンスが渡された時に例外が起きずに実行されること', async () => {
    UrlFetchApp.fetch = jest.fn(() => ({
      getContentText: jest.fn(() => getScheduleJson()),
    })) as jest.Mock;

    const calendarEventMock = jest.fn(() => ({
      deleteEvent: jest.fn().mockReturnThis(),
    }));

    CalendarApp.getCalendarById = jest.fn(() => ({
      getEventsForDay: jest.fn(() => [calendarEventMock()]),
    })) as jest.Mock;

    const date = dayjs('2019-12-01');
    await expect(
      OneMonthSchedule.setSchedule(
        date,
        getKeyakiCalendarUrl,
        keyakiCalendarIds
      )
    ).resolves.not.toThrow();
    expect(Calendar.deleteEvent).toBeCalledTimes(
      keyakiCalendarIds.length * date.endOf('month').date()
    );
    expect(Calendar.createEvent).toBeCalledTimes(
      (JSON.parse(getScheduleJson()) as []).length
    );
  });
  it('カレンダーの削除に失敗した場合に例外が起きて後続の処理が止まること', async () => {
    UrlFetchApp.fetch = jest.fn(() => ({
      getContentText: jest.fn(() => getScheduleJson()),
    })) as jest.Mock;

    const calendarEventMock = jest.fn(() => ({
      deleteEvent: jest.fn().mockReturnThis(),
    }));

    CalendarApp.getCalendarById = jest.fn(() => ({
      getEventsForDay: jest.fn(() => [calendarEventMock()]),
    })) as jest.Mock;

    Calendar.deleteEvent = jest.fn(() => {
      throw Error();
    });

    const date = dayjs('2019-12-01');
    await expect(
      OneMonthSchedule.setSchedule(
        date,
        getKeyakiCalendarUrl,
        keyakiCalendarIds
      )
    ).rejects.toThrow();
    expect(Calendar.createEvent).not.toBeCalled();
  });
  it('カレンダーの作成に失敗した場合に例外が起きて後続の処理が止まること', async () => {
    UrlFetchApp.fetch = jest.fn(() => ({
      getContentText: jest.fn(() => getScheduleJson()),
    })) as jest.Mock;

    const calendarEventMock = jest.fn(() => ({
      deleteEvent: jest.fn().mockReturnThis(),
    }));

    CalendarApp.getCalendarById = jest.fn(() => ({
      getEventsForDay: jest.fn(() => [calendarEventMock()]),
    })) as jest.Mock;

    Calendar.deleteEvent = jest.fn(() => {});
    Calendar.createEvent = jest.fn(() => {
      throw Error();
    });

    const date = dayjs('2019-12-01');
    await expect(
      OneMonthSchedule.setSchedule(
        date,
        getKeyakiCalendarUrl,
        keyakiCalendarIds
      )
    ).rejects.toThrow();
  });
  it('production環境では無かった場合にUrlFetchApp.fetchが呼ばれないこと', async () => {
    process.env.ENV = 'local';
    UrlFetchApp.fetch = jest.fn();
    fetchMock.mockOnce(getScheduleJson());

    const date = dayjs('2019-12-01');
    await OneMonthSchedule.setSchedule(
      date,
      getKeyakiCalendarUrl,
      keyakiCalendarIds
    );
    expect(UrlFetchApp.fetch).not.toBeCalled();
  });
  it('スケジュールのデータが開始日時が終了日時よりも後ろにある場合に終了日時は消されること', async () => {
    const scheduleJson =
      '[{"title":"欅坂46 こちら有楽町星空放送局","start":"2019-12-01","end":"2019-11-30","className":"media","description":"欅坂46 こちら有楽町星空放送局"}]';
    UrlFetchApp.fetch = jest.fn(() => ({
      getContentText: jest.fn(() => scheduleJson),
    })) as jest.Mock;

    const calendarEventMock = jest.fn(() => ({
      deleteEvent: jest.fn().mockReturnThis(),
    }));

    CalendarApp.getCalendarById = jest.fn(() => ({
      getEventsForDay: jest.fn(() => [calendarEventMock()]),
    })) as jest.Mock;

    const date = dayjs('2019-12-01');
    await expect(
      OneMonthSchedule.setSchedule(
        date,
        getKeyakiCalendarUrl,
        keyakiCalendarIds
      )
    ).resolves.not.toThrow();
    expect(Calendar.createEvent).toBeCalledWith(
      {
        className: 'media',
        description: '欅坂46 こちら有楽町星空放送局',
        end: '2019-11-30',
        endTime: undefined,
        start: '2019-12-01',
        title: '欅坂46 こちら有楽町星空放送局',
      },
      [
        {
          calendarId: 'jdnc8uf21242be7qjm5nmj7uok@group.calendar.google.com',
          type: 'shakehands',
        },
        {
          calendarId: 'eh0boh68ai7r2v15m38k2ms1lg@group.calendar.google.com',
          type: 'event',
        },
        {
          calendarId: '8l4srrnd9c6vge51k6cclsdsmc@group.calendar.google.com',
          type: 'goods',
        },
        {
          calendarId: '8tc88j0j9gmr95qa81r8t2210c@group.calendar.google.com',
          type: 'release',
        },
        {
          calendarId: 'f4bcp8sqv66sugk9m06gb1ioeg@group.calendar.google.com',
          type: 'ticket',
        },
        {
          calendarId: '9beck0tqd2096b3b5utkh0jg8g@group.calendar.google.com',
          type: 'media',
        },
        {
          calendarId: 'lihum5fsldhsspa3r8altr01ns@group.calendar.google.com',
          type: 'birthday',
        },
        {
          calendarId: 'efhfvac7iii073suf8v16tlmic@group.calendar.google.com',
          type: 'other',
        },
      ]
    );
  });
});
