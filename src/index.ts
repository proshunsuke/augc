// プロパティが無いと言われるのを防ぐ程度の型定義
// @ts-ignore
declare const global: {
    [x: string]: any ;
};

global.getKeyakiDocument = function(e: any) {
    const URL: string = "https://us-central1-augc-260709.cloudfunctions.net/getKeyakiSchedule";
    const scheduleJson = UrlFetchApp.fetch(URL).getContentText();
    const schedule = JSON.parse(scheduleJson);
    console.log(schedule);
    console.log(schedule[0]);
};
