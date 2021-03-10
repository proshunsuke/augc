import Calendar from '../src/calendar';
import { ScheduleObj } from '../src/keyakizaka/keyakiObjects';

/**
 *
 * @param {string | undefined} title
 * @param {string | undefined} start
 * @param {string | undefined} description
 * @param {string | undefined} className
 * @returns {ScheduleObj}
 */
function defaultSchedule({
  title = 'タイトル',
  start = '2019-12-01',
  description = '内容',
  className = 'media',
}: {
  title?: string;
  start?: string;
  description?: string;
  className?: string;
}): ScheduleObj {
  return {
    title,
    start,
    description,
    className,
  };
}

beforeEach(() => {
  jest.spyOn(console, 'info').mockImplementation();
});

describe('deleteEvent', (): void => {
  it('event.deleteEventが1回呼ばれること', (): void => {
    Utilities.sleep = jest.fn().mockReturnThis();

    const deleteEventMock = jest.fn().mockReturnThis();
    const calendarEventMock: jest.Mock = jest.fn(() => ({
      deleteEvent: deleteEventMock,
    }));
    Calendar.deleteEvent(calendarEventMock());
    expect(deleteEventMock).toBeCalledTimes(1);
  });
});

describe('createEvent', (): void => {
  describe('正常な値が引数に渡された場合', (): void => {
    const schedule = defaultSchedule({});
    it('createAllDayEventが正常に呼ばれること', (): void => {
      const createAllDayEventMock = jest.fn().mockReturnThis();

      CalendarApp.getCalendarById = jest.fn(() => ({
        createAllDayEvent: createAllDayEventMock,
      })) as jest.Mock;
      Utilities.sleep = jest.fn().mockReturnThis();
      Calendar.createEvent(schedule);
      expect(createAllDayEventMock).toBeCalledTimes(1);
    });
  });
  describe('存在しない種類の予定の場合', (): void => {
    const schedule = defaultSchedule({ className: 'none' });
    it('例外が投げられること', (): void => {
      expect(() => {
        Calendar.createEvent(schedule);
      }).toThrow('存在しない種類のスケジュールです。className: none');
    });
  });
});
