import Calendar from '../src/calendar';
import { ScheduleInterface } from '../src/calendarInterface';
import { keyakiCalendarIds } from '../src/sites/keyakizaka/keyakiObjects';

/**
 *
 * @param {string | undefined} title
 * @param {string | undefined} date
 * @param {string | undefined} description
 * @param {string | undefined} type
 * @param startTime
 * @param endTime
 * @returns {ScheduleInterface}
 */
function defaultSchedule({
  title = 'タイトル',
  date = '2019-12-01',
  description = '内容',
  type = 'media',
  startTime = '2019-12-01 20:00:00',
  endTime = '2019-12-01 22:00:00',
}: {
  title?: string;
  date?: string;
  description?: string;
  type?: string;
  startTime?: string;
  endTime?: string;
}): ScheduleInterface {
  return {
    title,
    date,
    description,
    type,
    startTime,
    endTime,
  };
}

const OLD_ENV = process.env;

beforeEach(() => {
  jest.spyOn(console, 'info').mockImplementation();
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  process.env = OLD_ENV;
});

describe('deleteEvent', (): void => {
  it('event.deleteEventが1回呼ばれること', (): void => {
    Utilities.sleep = jest.fn().mockReturnThis();

    const deleteEventMock = jest.fn().mockReturnThis();
    const calendarEventMock: jest.Mock = jest.fn(() => ({
      deleteEvent: deleteEventMock,
    }));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Calendar.deleteEvent(calendarEventMock());
    expect(deleteEventMock).toBeCalledTimes(1);
  });
  it('production環境では無かった場合にUtilities.sleepが呼ばれないこと', () => {
    process.env.ENV = 'local';
    Utilities.sleep = jest.fn();

    const deleteEventMock = jest.fn().mockReturnThis();
    const calendarEventMock: jest.Mock = jest.fn(() => ({
      deleteEvent: deleteEventMock,
    }));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Calendar.deleteEvent(calendarEventMock());
    expect(Utilities.sleep).not.toBeCalled();
  });
});

describe('createEvent', (): void => {
  describe('期間の無い予定の場合', (): void => {
    const schedule = defaultSchedule({});
    delete schedule.startTime;
    delete schedule.endTime;
    it('createAllDayEventが正常に呼ばれること', (): void => {
      const createAllDayEventMock = jest.fn().mockReturnThis();

      CalendarApp.getCalendarById = jest.fn(() => ({
        createAllDayEvent: createAllDayEventMock,
      })) as jest.Mock;
      Utilities.sleep = jest.fn().mockReturnThis();
      Calendar.createEvent(schedule, keyakiCalendarIds);
      expect(createAllDayEventMock).toBeCalledTimes(1);
    });
  });
  describe('期間のある予定の場合', (): void => {
    const schedule = defaultSchedule({});
    it('createEventが正常に呼ばれること', (): void => {
      const createEventMock = jest.fn().mockReturnThis();

      CalendarApp.getCalendarById = jest.fn(() => ({
        createEvent: createEventMock,
      })) as jest.Mock;
      Utilities.sleep = jest.fn().mockReturnThis();
      Calendar.createEvent(schedule, keyakiCalendarIds);
      expect(createEventMock).toBeCalledTimes(1);
    });
  });
  describe('存在しない種類の予定の場合', (): void => {
    const schedule = defaultSchedule({ type: 'none' });
    it('例外が投げられること', (): void => {
      expect(() => {
        Calendar.createEvent(schedule, keyakiCalendarIds);
      }).toThrow('存在しない種類のスケジュールです。type: none');
    });
  });
  it('production環境では無かった場合にCalendarApp.getCalendarByIdが呼ばれないこと', () => {
    process.env.ENV = 'local';
    CalendarApp.getCalendarById = jest.fn();

    const schedule = defaultSchedule({});
    Calendar.createEvent(schedule, keyakiCalendarIds);
    expect(CalendarApp.getCalendarById).not.toBeCalled();
  });
});
