import Calendar from "../src/calendar";
import dayjs from "dayjs";
// @ts-ignore
import CalendarEventClass from "./support/calendarEvent";
import {ScheduleObj} from "../src/keyakiObjects";

const calendar = new Calendar();

describe("deleteCalendarEvents", (): void => {
    const calendarEvent = new CalendarEventClass();
    it("1ヶ月分deleteEvent()が呼ばれること", (): void => {
        // @ts-ignore
        CalendarApp.getCalendarById = jest.fn(() => ({
            getEventsForDay: jest.fn(() => [
                calendarEvent
            ])
        }));

        calendarEvent.deleteEvent = jest.fn(() => {
            return;
        });
        calendar.deleteCalendarEvents("id", dayjs("2019-12-01"));
        expect(calendarEvent.deleteEvent).toBeCalledTimes(31);
    });
});

describe("createEvent", (): void => {
    describe("正常な値が引数に渡された場合", (): void => {
        const schedule = defaultSchedule({});
        it("createAllDayEventが正常に呼ばれること", (): void => {
            const createAllDayEventMock = jest.fn(() => {
                return;
            });

            // @ts-ignore
            CalendarApp.getCalendarById = jest.fn(() => ({
                createAllDayEvent: createAllDayEventMock
            }));
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
