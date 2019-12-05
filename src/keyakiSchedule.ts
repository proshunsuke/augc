import dayjs from "dayjs";
import { Calendar } from "./calendar";
import { ScheduleObj, KeyakiCalendarObj, getKeyakiCalendarUrl, keyakiCalendarIds } from "./keyakiObjects";

export class KeyakiSchedule {
    /**
     *
     * @param date
     */
    setSchedule = (date: dayjs.Dayjs): void => {
        const customUrl: string = getKeyakiCalendarUrl + date.format('YYYYMMDD');
        const scheduleJson: string = UrlFetchApp.fetch(customUrl).getContentText();
        const scheduleList: ScheduleObj[] = JSON.parse(scheduleJson);

        const calendar = new Calendar();
        keyakiCalendarIds.forEach((keyakiCalendarObj: KeyakiCalendarObj) => calendar.deleteCalendarEvents(keyakiCalendarObj.calendarId, date));
        scheduleList.forEach((schedule: ScheduleObj) => calendar.createEvent(schedule));
    };
}
