import dayjs from "dayjs";
import { ScheduleObj, KeyakiCalendarObj, keyakiCalendarIds } from "./keyakiObjects";

export class Calendar {
    /**
     *
     * @param calendarId
     * @param date
     */
    deleteCalendarEvents = (calendarId: string, date: dayjs.Dayjs): void => {
        const calendar = CalendarApp.getCalendarById(calendarId);
        const targetDateBeginningOfMonth = date;
        const targetDateBeginningOfNextMonth = date.add(1, 'month');
        let targetDate = targetDateBeginningOfMonth;
        while (targetDate.isBefore(targetDateBeginningOfNextMonth)) {
            const events = calendar.getEventsForDay(targetDate.toDate());
            events.forEach(event => {
                event.deleteEvent();
            });
            targetDate = targetDate.add(1, 'day');
        }
    };

    /**
     *
     * @param schedule
     */
    createEvent = (schedule: ScheduleObj): void => {
        const keyakiCalendarId: KeyakiCalendarObj | undefined = keyakiCalendarIds.find((keyakiCalendarId: KeyakiCalendarObj) => {
            return (keyakiCalendarId.kind === schedule.className);
        });
        const calendarId: string = (keyakiCalendarId || {kind: '', calendarId: ''}).calendarId;
        CalendarApp.getCalendarById(calendarId).createAllDayEvent(schedule.title, new Date(schedule.start));
    };
}
