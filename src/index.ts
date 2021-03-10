import Schedule from "./schedule";
import Trigger from "./lib/trigger";
import dayjs from "dayjs";
import 'regenerator-runtime';

// @ts-ignore
declare const global: {
    [x: string]: any;
};

/**
 *
 * @param e
 */
global.createSetScheduleTrigger = (e: any) => {
    console.info("スケジュール更新のトリガーを作成します");
    Trigger.setTrigger(dayjs());
    console.info("スケジュール更新のトリガーを作成しました");
};

/**
 *
 * @param e
 */
global.setSchedule = async (e: any) => {
    const schedule = new Schedule();
    console.info("スケジュール更新を開始します");
    await schedule.setSchedule();
    console.info("スケジュール更新が完了しました");
};

export const createSetScheduleTrigger = global.createSetScheduleTrigger;
export const setSchedule = global.setSchedule;
