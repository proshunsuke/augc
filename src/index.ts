import { Schedule } from "./schedule";

// プロパティが無いと言われるのを防ぐ程度の型定義
// @ts-ignore
declare const global: {
    [x: string]: any;
};

global.execute = function (e: any) {
    const schedule = new Schedule();
    schedule.setSchedule();
};
