import { ScheduleObj, KeyakiCalendarObj, keyakiCalendarIds} from "./keyakizaka/keyakiObjects"
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import Retry from "./lib/retry";

export default class Calendar {
    /**
     *
     * @param event
     */
    deleteEvent(event: CalendarEvent): void {
        Retry.retryable(3, () => {
            event.deleteEvent();
        });
        Utilities.sleep(500); // API制限に引っかかってそうなのでsleepする
    }

    /**
     *
     * @param schedule
     */
    createEvent(schedule: ScheduleObj): void {
        const keyakiCalendarId: KeyakiCalendarObj | undefined = keyakiCalendarIds.find((keyakiCalendarId: KeyakiCalendarObj) => {
            return (keyakiCalendarId.kind === schedule.className);
        });
        if (typeof keyakiCalendarId === 'undefined') {
            console.info("スケジュールの内容: ");
            console.info(schedule);
            throw new Error("存在しない種類のスケジュールです。className: " + schedule.className);
        }
        const calendarId: string = keyakiCalendarId.calendarId;
        Retry.retryable(3, () => {
            CalendarApp.getCalendarById(calendarId).createAllDayEvent(schedule.title, new Date(schedule.start));
        });
        console.log("予定を作成しました。日付: " + schedule.start + ", タイトル: " + schedule.title);
        Utilities.sleep(500); // API制限に引っかかってそうなのでsleepする
    };
}
