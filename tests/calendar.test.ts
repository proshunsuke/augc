import { Calendar } from "../src/calendar";
import dayjs from "dayjs";
// @ts-ignore
import { CalendarEventClass } from "./support/calendarEvent";

const calendarEvent = new CalendarEventClass();

// @ts-ignore
CalendarApp.getCalendarById = jest.fn(() => ({
    getEventsForDay: jest.fn(() => [
        calendarEvent
    ])
}));

calendarEvent.deleteEvent = jest.fn(() => {return;});

describe('deleteCalendarEvents', (): void => {
    it('1ヶ月分deleteEvent()が呼ばれること', (): void => {
        const calendar = new Calendar();
        calendar.deleteCalendarEvents('', dayjs('2019-12-01'));
        expect(calendarEvent.deleteEvent).toBeCalledTimes(31);
    });
});