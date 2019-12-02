// プロパティが無いと言われるのを防ぐ程度の型定義
// @ts-ignore
declare const global: {
    [x: string]: any ;
};

global.getKeyakiDocument = function(e: any) {
    // const URL: string = "https://us-central1-augc-260709.cloudfunctions.net/getKeyakiSchedule";
    // const scheduleJson = UrlFetchApp.fetch(URL).getContentText();

    // mock
    const scheduleJson = "[{\"title\":\"欅坂46 こちら有楽町星空放送局\",\"start\":\"2019-12-01\",\"className\":\"media\",\"description\":\"欅坂46 こちら有楽町星空放送局\"},{\"title\":\"テレビ東京「欅って、書けない?」\",\"start\":\"2019-12-01\",\"className\":\"media\",\"description\":\"テレビ東京「欅って、書けない?」\"},{\"title\":\"「ヤングマガジン」2020年1月号\",\"start\":\"2019-12-02\",\"className\":\"media\",\"description\":\"「ヤングマガジン」2020年1月号\"},{\"title\":\"文化放送「レコメン!」\",\"start\":\"2019-12-02\",\"className\":\"media\",\"description\":\"文化放送「レコメン!」\"},{\"title\":\"テレビ朝日 「即席カルテット」\",\"start\":\"2019-12-02\",\"className\":\"media\",\"description\":\"テレビ朝日 「即席カルテット」\"},{\"title\":\"テレビ朝日 「即席カルテット」\",\"start\":\"2019-12-03\",\"className\":\"media\",\"description\":\"テレビ朝日 「即席カルテット」\"},{\"title\":\"MBSラジオ「ザ・ヒットスタジオ」\",\"start\":\"2019-12-03\",\"className\":\"media\",\"description\":\"MBSラジオ「ザ・ヒットスタジオ」\"},{\"title\":\"「anan」No.2179\",\"start\":\"2019-12-04\",\"className\":\"media\",\"description\":\"「anan」No.2179\"},{\"title\":\"フジテレビ「2019FNS歌謡祭 第1夜」\",\"start\":\"2019-12-04\",\"className\":\"media\",\"description\":\"フジテレビ「2019FNS歌謡祭 第1夜」\"},{\"title\":\"テレビ朝日 「即席カルテット」\",\"start\":\"2019-12-04\",\"className\":\"media\",\"description\":\"テレビ朝日 「即席カルテット」\"},{\"title\":\"鈴本美愉の誕生日\",\"start\":\"2019-12-05\",\"className\":\"birthday\",\"description\":\"鈴本美愉の誕生日\"},{\"title\":\"MBSラジオ「ちょこっとやってまーす!」\",\"start\":\"2019-12-07\",\"className\":\"media\",\"description\":\"MBSラジオ「ちょこっとやってまーす!」\"},{\"title\":\"欅坂46 こちら有楽町星空放送局\",\"start\":\"2019-12-08\",\"className\":\"media\",\"description\":\"欅坂46 こちら有楽町星空放送局\"},{\"title\":\"テレビ東京「欅って、書けない?」\",\"start\":\"2019-12-08\",\"className\":\"media\",\"description\":\"テレビ東京「欅って、書けない?」\"},{\"title\":\"文化放送「レコメン!」\",\"start\":\"2019-12-09\",\"className\":\"media\",\"description\":\"文化放送「レコメン!」\"},{\"title\":\"MBSラジオ「ザ・ヒットスタジオ」\",\"start\":\"2019-12-10\",\"className\":\"media\",\"description\":\"MBSラジオ「ザ・ヒットスタジオ」\"},{\"title\":\"「blt graph.」vol.50\",\"start\":\"2019-12-11\",\"className\":\"media\",\"description\":\"「blt graph.」vol.50\"},{\"title\":\"「UTB+」vol.49\",\"start\":\"2019-12-11\",\"className\":\"media\",\"description\":\"「UTB+」vol.49\"},{\"title\":\"フジテレビ「2019FNS歌謡祭 第2夜」\",\"start\":\"2019-12-11\",\"className\":\"media\",\"description\":\"フジテレビ「2019FNS歌謡祭 第2夜」\"},{\"title\":\"WOWOWシネマ「響-HIBIKI-」\",\"start\":\"2019-12-11\",\"className\":\"media\",\"description\":\"WOWOWシネマ「響-HIBIKI-」\"},{\"title\":\"MBSラジオ「ちょこっとやってまーす!」\",\"start\":\"2019-12-14\",\"className\":\"media\",\"description\":\"MBSラジオ「ちょこっとやってまーす!」\"},{\"title\":\"欅坂46 こちら有楽町星空放送局\",\"start\":\"2019-12-15\",\"className\":\"media\",\"description\":\"欅坂46 こちら有楽町星空放送局\"},{\"title\":\"テレビ東京「欅って、書けない?」\",\"start\":\"2019-12-15\",\"className\":\"media\",\"description\":\"テレビ東京「欅って、書けない?」\"},{\"title\":\"文化放送「レコメン!」\",\"start\":\"2019-12-16\",\"className\":\"media\",\"description\":\"文化放送「レコメン!」\"},{\"title\":\"MBSラジオ「ザ・ヒットスタジオ」\",\"start\":\"2019-12-17\",\"className\":\"media\",\"description\":\"MBSラジオ「ザ・ヒットスタジオ」\"},{\"title\":\"MBSラジオ「ちょこっとやってまーす!」\",\"start\":\"2019-12-21\",\"className\":\"media\",\"description\":\"MBSラジオ「ちょこっとやってまーす!」\"},{\"title\":\"欅坂46 こちら有楽町星空放送局\",\"start\":\"2019-12-22\",\"className\":\"media\",\"description\":\"欅坂46 こちら有楽町星空放送局\"},{\"title\":\"テレビ東京「欅って、書けない?」\",\"start\":\"2019-12-22\",\"className\":\"media\",\"description\":\"テレビ東京「欅って、書けない?」\"},{\"title\":\"文化放送「レコメン!」\",\"start\":\"2019-12-23\",\"className\":\"media\",\"description\":\"文化放送「レコメン!」\"},{\"title\":\"MBSラジオ「ザ・ヒットスタジオ」\",\"start\":\"2019-12-24\",\"className\":\"media\",\"description\":\"MBSラジオ「ザ・ヒットスタジオ」\"},{\"title\":\"「COUNTDOWN JAPAN 19/20」\",\"start\":\"2019-12-28\",\"className\":\"event\",\"description\":\"「COUNTDOWN JAPAN 19/20」\"},{\"title\":\"MBSラジオ「ちょこっとやってまーす!」\",\"start\":\"2019-12-28\",\"className\":\"media\",\"description\":\"MBSラジオ「ちょこっとやってまーす!」\"},{\"title\":\"欅坂46 こちら有楽町星空放送局\",\"start\":\"2019-12-29\",\"className\":\"media\",\"description\":\"欅坂46 こちら有楽町星空放送局\"},{\"title\":\"テレビ東京「欅って、書けない?」\",\"start\":\"2019-12-29\",\"className\":\"media\",\"description\":\"テレビ東京「欅って、書けない?」\"},{\"title\":\"文化放送「レコメン!」\",\"start\":\"2019-12-30\",\"className\":\"media\",\"description\":\"文化放送「レコメン!」\"},{\"title\":\" NHK「第70回NHK紅白歌合戦」\",\"start\":\"2019-12-31\",\"className\":\"media\",\"description\":\" NHK「第70回NHK紅白歌合戦」\"},{\"title\":\"MBSラジオ「ザ・ヒットスタジオ」\",\"start\":\"2019-12-31\",\"className\":\"media\",\"description\":\"MBSラジオ「ザ・ヒットスタジオ」\"}]";
    const schedule: [] = JSON.parse(scheduleJson);

    // メディアのカレンダー
    const mediaCalendar = CalendarApp.getCalendarById('9beck0tqd2096b3b5utkh0jg8g@group.calendar.google.com');

    // その月のメディアの予定全部消す
    const targetDateBeginningOfMonth = new Date("2019-12-01");
    const targetDateBeginningOfNextMonth = new Date(targetDateBeginningOfMonth.getFullYear(), targetDateBeginningOfMonth.getMonth() + 1, 1);
    let targetDate = targetDateBeginningOfMonth;
    while (targetDate.getTime() <= targetDateBeginningOfNextMonth.getTime()) {
        const events = mediaCalendar.getEventsForDay(targetDate);
        events.forEach(function(event){
            event.deleteEvent();
        });
        targetDate.setDate(targetDate.getDate() + 1);
    }

    // メディアのイベントの予定追加する
    schedule.forEach(function(s: {title: string; start: string; description: string; className: string}){
        if (s.className == 'media') {
            mediaCalendar.createAllDayEvent(s.title, new Date(s.start));
        }
    });
};
