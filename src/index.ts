import Schedule from "./schedule";

// @ts-ignore
declare const global: {
    [x: string]: any;
};

global.execute = function (e: any) {
    const schedule = new Schedule();
    console.log("スケジュール更新を開始します");
    schedule.setSchedule();
    console.log("スケジュール更新が完了しました");
};

export const execute = global.execute;
