import dayjs from "dayjs";
import Calendar from "../calendar";
import {ScheduleObj, KeyakiCalendarObj, getKeyakiCalendarUrl, keyakiCalendarIds} from "./keyakiObjects";
import Retry from "../lib/retry";
import fetch, { Response } from 'node-fetch';
import 'regenerator-runtime';

export default class KeyakiSchedule {
    /**
     *
     * @param {dayjs.Dayjs} date
     */
    async setSchedule(date: dayjs.Dayjs): Promise<void> {
        const customUrl: string = getKeyakiCalendarUrl + date.format('YYYYMMDD');

        const scheduleJson = await this.getScheduleJson(customUrl);
        // console.log(scheduleJson);

        const scheduleList: ScheduleObj[] = JSON.parse(scheduleJson);

        console.info(date.format('YYYY年MM月') + "分の予定を更新します");
        this.delete1MonthCalendarEvents(date);
        this.create1MonthEvents(scheduleList, date);
        console.info(date.format('YYYY年MM月') + "分の予定を更新しました");
    };

    /**
     *
     * @param {string} customUrl
     * @returns {Promise<any>}
     * @private
     */
    private async getScheduleJson(customUrl: string) {
        if (process.env.ENV === 'production') {
            return Retry.retryable(3,  () => {
                return UrlFetchApp.fetch(customUrl).getContentText();
            });
        } else {
            const response = await fetch(customUrl);
            return response.text();
        }
    }

    /**
     *
     * @param {dayjs.Dayjs} date
     */
    private delete1MonthCalendarEvents(date: dayjs.Dayjs) {
        const calendar = new Calendar();
        let deleteEventCallCount: number = 0;
        keyakiCalendarIds.forEach((keyakiCalendarObj: KeyakiCalendarObj) => {
            if (process.env.ENV !== 'production') return;
            const calendarApp: GoogleAppsScript.Calendar.Calendar = Retry.retryable(3, () => {
                return CalendarApp.getCalendarById(keyakiCalendarObj.calendarId);
            });
            const targetDateBeginningOfMonth = date;
            const targetDateBeginningOfNextMonth = date.add(1, 'month');
            let targetDate = targetDateBeginningOfMonth;

            while (targetDate.isBefore(targetDateBeginningOfNextMonth)) {
                const events = calendarApp.getEventsForDay(targetDate.toDate());
                events.forEach((event) => {
                    deleteEventCallCount++;
                    try {
                        calendar.deleteEvent(event);
                    } catch (e) {
                        console.error("カレンダー削除に失敗しました。失敗するまでに実行された回数: " + deleteEventCallCount.toString());
                        throw e;
                    }
                });
                targetDate = targetDate.add(1, 'day');
            }
        });
        console.info(date.format("YYYY年MM月") + "分のカレンダー削除実行回数" + deleteEventCallCount.toString());
    }

    /**
     *
     * @param {ScheduleObj[]} scheduleList
     * @param {dayjs.Dayjs} date
     */
    private create1MonthEvents(scheduleList: ScheduleObj[], date: dayjs.Dayjs) {
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
        console.info(date.format("YYYY年MM月") +"分のカレンダー作成実行回数: " + createEventCallCount.toString());
    }
}
