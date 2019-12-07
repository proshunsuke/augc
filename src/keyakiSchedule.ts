import dayjs from "dayjs";
import Calendar from "./calendar";
import {ScheduleObj, KeyakiCalendarObj, getKeyakiCalendarUrl, keyakiCalendarIds} from "./keyakiObjects";

export default class KeyakiSchedule {
    /**
     *
     * @param date
     */
    setSchedule = (date: dayjs.Dayjs): void => {
        const customUrl: string = getKeyakiCalendarUrl + date.format('YYYYMMDD');
        const scheduleJson: string = UrlFetchApp.fetch(customUrl).getContentText();
        const scheduleList: ScheduleObj[] = JSON.parse(scheduleJson);

        const calendar = new Calendar();
        let deleteEventCallCount: number = 0;
        keyakiCalendarIds.forEach((keyakiCalendarObj: KeyakiCalendarObj) => {
            deleteEventCallCount++;
            try {
                calendar.deleteCalendarEvents(keyakiCalendarObj.calendarId, date);
            } catch (e) {
                console.error("カレンダー削除に失敗しました。失敗するまでに実行された回数: " + deleteEventCallCount.toString());
                throw e;
            }
        });
        console.info("全てのカレンダー削除実行回数" + deleteEventCallCount.toString());

        let createEventCallCount: number = 0;
        scheduleList.forEach((schedule: ScheduleObj) => {
            createEventCallCount++;
            try {
                calendar.createEvent(schedule);
            } catch (e) {
                console.error("カレンダー作成に失敗しました。失敗するまでに実行された回数: " + createEventCallCount.toString());
                throw e;
            }

            console.info("全てのカレンダー作成実行回数: " + createEventCallCount.toString());
        });
    };
}
