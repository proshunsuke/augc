import Calendar from "../src/calendar";
// @ts-ignore
import CalendarEventClass from "./support/calendarEvent";
import {ScheduleObj} from "../src/keyakizaka/keyakiObjects";

const calendar = new Calendar();

describe("deleteEvent", (): void => {
    const calendarEvent = new CalendarEventClass();
    it("event.deleteEventが1回呼ばれること", (): void => {
        Utilities.sleep = jest.fn().mockReturnThis();

        calendarEvent.deleteEvent = jest.fn().mockReturnThis();
        calendar.deleteEvent(calendarEvent);
        expect(calendarEvent.deleteEvent).toBeCalledTimes(1);
    });
});

describe("createEvent", (): void => {
    describe("正常な値が引数に渡された場合", (): void => {
        const schedule = defaultSchedule({});
        it("createAllDayEventが正常に呼ばれること", (): void => {
            const createAllDayEventMock = jest.fn().mockReturnThis();

            // @ts-ignore
            CalendarApp.getCalendarById = jest.fn(() => ({createAllDayEvent: createAllDayEventMock}));
            Utilities.sleep = jest.fn().mockReturnThis();
            calendar.createEvent(schedule);
            expect(createAllDayEventMock).toBeCalledTimes(1);
        });
    });
    describe("存在しない種類の予定の場合", (): void => {
        const schedule = defaultSchedule({className: 'none'});
        it("例外が投げられること", (): void => {
            expect(() => {calendar.createEvent(schedule)}).toThrow("存在しない種類のスケジュールです。className: none");
        })
    })
});

function defaultSchedule(
    {
        title = "タイトル",
        start = "2019-12-01",
        description = "内容",
        className = "media"
    }: {
        title?: string,
        start?: string,
        description?: string,
        className?: string
    }): ScheduleObj {
    return {
        title: title,
        start: start,
        description: description,
        className: className
    };
}
