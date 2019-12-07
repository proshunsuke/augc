import dayjs from "dayjs";
import Calendar from "../calendar";
import {ScheduleObj, KeyakiCalendarObj, getKeyakiCalendarUrl, keyakiCalendarIds} from "./keyakiObjects";

export default class KeyakiSchedule {
    /**
     *
     * @param date
     */
    setSchedule(date: dayjs.Dayjs): void {
        const customUrl: string = getKeyakiCalendarUrl + date.format('YYYYMMDD');
        const scheduleJson: string = UrlFetchApp.fetch(customUrl).getContentText();
        const scheduleList: ScheduleObj[] = JSON.parse(scheduleJson);

        this.delete1MonthCalendarEvents(date);
        this.createEvents(scheduleList);
    };

    /**
     *
     * @param date
     */
    private delete1MonthCalendarEvents(date: dayjs.Dayjs) {
        const calendar = new Calendar();
        let deleteEventCallCount: number = 0;
        keyakiCalendarIds.forEach((keyakiCalendarObj: KeyakiCalendarObj) => {
            deleteEventCallCount++;
            try {
                calendar.delete1MonthCalendarEvents(keyakiCalendarObj.calendarId, date);
            } catch (e) {
                console.error("カレンダー削除に失敗しました。失敗するまでに実行された回数: " + deleteEventCallCount.toString());
                throw e;
            }
        });
        console.info("全てのカレンダー削除実行回数" + deleteEventCallCount.toString());
    }

    /**
     *
     * @param scheduleList
     */
    private createEvents(scheduleList: ScheduleObj[]) {
        const calendar = new Calendar();
        let createEventCallCount: number = 0;
        scheduleList.forEach((schedule: ScheduleObj) => {
            createEventCallCount++;
            try {
                calendar.createEvent(schedule);
            } catch (e) {
                console.error("カレンダー作成に失敗しました。失敗するまでに実行された回数: " + createEventCallCount.toString());
                throw e;
            }
        });
        console.info("全てのカレンダー作成実行回数: " + createEventCallCount.toString());
    }
}
