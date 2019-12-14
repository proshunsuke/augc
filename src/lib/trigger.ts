import dayjs from "dayjs";

const TARGET_DATE_KEY: string = 'target_date';
const TERMINATION_MINUTES: number = 4;
const TRIGGER_FUNCTION_NAME: string = 'execute';
const TRIGGER_DURATION: number = 10 * 1000; // 10秒後

export default class Trigger {
    /**
     *
     * @param {dayjs.Dayjs} startDate
     * @returns {boolean}
     */
    static hasExceededTerminationMinutes(startDate: dayjs.Dayjs): boolean {
        return dayjs().diff(startDate, 'm') >= TERMINATION_MINUTES
    }

    /**
     *
     * @param {dayjs.Dayjs} targetDate
     */
    static setTrigger(targetDate: dayjs.Dayjs): void {
        const properties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties();
        properties.setProperty(TARGET_DATE_KEY, targetDate.format('YYYY-MM-DD'));
        ScriptApp.newTrigger(TRIGGER_FUNCTION_NAME).timeBased().after(TRIGGER_DURATION);
        console.info(TERMINATION_MINUTES + "分以上経過したので次のトリガーをセットして終了します。次実行開始する月: " + targetDate.format('YYYY-MM-DD'));
    }

    /**
     *
     * @returns {string | null}
     */
    static getTargetDateProperty(): string | null {
        const properties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties();
        return properties.getProperty(TARGET_DATE_KEY);
    }

    static deleteTargetDateProperty(): void {
        const properties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties();
        properties.deleteProperty(TARGET_DATE_KEY);
    }
}