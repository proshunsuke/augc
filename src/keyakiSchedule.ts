import dayjs from "dayjs";

interface ScheduleObj {
    title: string;
    start: string;
    description: string;
    className: string
}

interface KeyakiCalendarObj {
    kind: string;
    calendarId: string
}

export class KeyakiSchedule {
    setKeyakiSchedule = (date: dayjs.Dayjs): void => {
        const customUrl: string = this.getKeyakiCalendarUrl + date.format('YYYYMMDD');
        const scheduleJson: string = UrlFetchApp.fetch(customUrl).getContentText();
        const scheduleList: ScheduleObj[] = JSON.parse(scheduleJson);

        this.keyakiCalendarIds.forEach((keyakiCalendarObj: KeyakiCalendarObj) => this.deleteCalendarEvents(keyakiCalendarObj.calendarId, date));
        scheduleList.forEach((schedule: ScheduleObj) => this.createEvent(schedule));
    };

    private createEvent = (schedule: ScheduleObj): void => {
        const keyakiCalendarId: KeyakiCalendarObj | undefined = this.keyakiCalendarIds.find((keyakiCalendarId: KeyakiCalendarObj) => {
            return (keyakiCalendarId.kind === schedule.className);
        });
        const calendarId: string = (keyakiCalendarId || {kind: '', calendarId: ''}).calendarId;
        CalendarApp.getCalendarById(calendarId).createAllDayEvent(schedule.title, new Date(schedule.start));
    };

    private deleteCalendarEvents = (calendarId: string, date: dayjs.Dayjs): void => {
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

    readonly getKeyakiCalendarUrl: string = "https://us-central1-augc-260709.cloudfunctions.net/getKeyakiSchedule?date=";
    readonly keyakiCalendarIds: KeyakiCalendarObj[] = [
        {
            kind: 'shakehands',
            calendarId: 'jdnc8uf21242be7qjm5nmj7uok@group.calendar.google.com'
        },
        {
            kind: 'event',
            calendarId: 'eh0boh68ai7r2v15m38k2ms1lg@group.calendar.google.com'
        },
        {
            kind: 'goods',
            calendarId: '8l4srrnd9c6vge51k6cclsdsmc@group.calendar.google.com'
        },
        {
            kind: 'release',
            calendarId: '8tc88j0j9gmr95qa81r8t2210c@group.calendar.google.com'
        },
        {
            kind: 'ticket',
            calendarId: 'f4bcp8sqv66sugk9m06gb1ioeg@group.calendar.google.com'
        },
        {
            kind: 'media',
            calendarId: '9beck0tqd2096b3b5utkh0jg8g@group.calendar.google.com'
        },
        {
            kind: 'birthday',
            calendarId: 'lihum5fsldhsspa3r8altr01ns@group.calendar.google.com'
        },
        {
            kind: 'other',
            calendarId: 'efhfvac7iii073suf8v16tlmic@group.calendar.google.com'
        }
    ];
}