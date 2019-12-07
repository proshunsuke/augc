import Schedule from "./schedule";

// @ts-ignore
declare const global: {
    [x: string]: any;
};

global.execute = function (e: any) {
    const schedule = new Schedule();
    schedule.setSchedule();
};

export const execute = global.execute;
