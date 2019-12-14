import Schedule from "./schedule";

// @ts-ignore
declare const global: {
    [x: string]: any;
};

/**
 *
 * @param e
 */
global.execute = function (e: any) {
    const schedule = new Schedule();
    console.info("スケジュール更新を開始します");
    schedule.setSchedule();
    console.info("スケジュール更新が完了しました");
};

export const execute = global.execute;
