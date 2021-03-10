import dayjs from 'dayjs';
import fetchMock from 'jest-fetch-mock';
import KeyakiSchedule from '../../src/keyakizaka/keyakiSchedule';
import Calendar from '../../src/calendar';
import { keyakiCalendarIds } from '../../src/keyakizaka/keyakiObjects';

function getScheduleJson() {
  return '[{"title":"欅坂46 こちら有楽町星空放送局","start":"2019-12-01","className":"media","description":"欅坂46 こちら有楽町星空放送局"},{"title":"テレビ東京「欅って、書けない?」","start":"2019-12-01","className":"media","description":"テレビ東京「欅って、書けない?」"}]';
}

jest.mock('../../src/calendar');
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
    await expect(KeyakiSchedule.setSchedule(date)).resolves.not.toThrow();
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
    await expect(KeyakiSchedule.setSchedule(date)).rejects.toThrow();
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
    await expect(KeyakiSchedule.setSchedule(date)).rejects.toThrow();
  });
  it('production環境では無かった場合にUrlFetchApp.fetchが呼ばれないこと', async () => {
    process.env.ENV = 'local';
    UrlFetchApp.fetch = jest.fn();
    fetchMock.mockOnce(getScheduleJson());

    const date = dayjs('2019-12-01');
    await KeyakiSchedule.setSchedule(date);
    expect(UrlFetchApp.fetch).not.toBeCalled();
  });
});
