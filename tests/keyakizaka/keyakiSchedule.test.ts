import dayjs from "dayjs";

import KeyakiSchedule from "../../src/keyakizaka/keyakiSchedule";
import Calendar from "../../src/calendar";
import { mocked } from "ts-jest/utils";
import {keyakiCalendarIds} from "../../src/keyakizaka/keyakiObjects";

jest.mock("../../src/calendar");
describe("setSchedule", (): void => {
    beforeEach(() => {
        mocked(Calendar).mockClear()
    });
    it("dayjsのインスタンスが渡された時に例外が起きずに実行されること", (): void => {
        // @ts-ignore
        UrlFetchApp.fetch = jest.fn(() => ({
            getContentText: jest.fn(() => getScheduleJson())
        }));

        const date: dayjs.Dayjs = dayjs('2019-12-01');
        const keyakiSchedule: KeyakiSchedule = new KeyakiSchedule();
        expect(() => {keyakiSchedule.setSchedule(date)}).not.toThrow();
        // @ts-ignore
        expect(Calendar.mock.instances[0].delete1MonthCalendarEvents).toBeCalledTimes(keyakiCalendarIds.length);
        // @ts-ignore
        expect(Calendar.mock.instances[1].createEvent).toBeCalledTimes(JSON.parse(getScheduleJson()).length);
    });
    it("カレンダーの削除に失敗した場合に例外が起きて後続の処理が止まること", ():void => {
        // @ts-ignore
        UrlFetchApp.fetch = jest.fn(() => ({
            getContentText: jest.fn(() => getScheduleJson())
        }));

        mocked(Calendar).mockImplementation((): any => {
            return {
                delete1MonthCalendarEvents: (): void => {throw Error()}
            }
        });

        const date: dayjs.Dayjs = dayjs('2019-12-01');
        const keyakiSchedule: KeyakiSchedule = new KeyakiSchedule();
        expect(() => {keyakiSchedule.setSchedule(date)}).toThrow();
        // @ts-ignore
        expect(Calendar.mock.instances.length).toBe(1);
        // @ts-ignore
        expect(Calendar.mock.instances[0].createEvent).not.toBeCalled();
    });
    it("カレンダーの作成に失敗した場合に例外が起きて後続の処理が止まること", ():void => {
        // @ts-ignore
        UrlFetchApp.fetch = jest.fn(() => ({
            getContentText: jest.fn(() => getScheduleJson())
        }));

        mocked(Calendar).mockImplementation((): any => {
            return {
                delete1MonthCalendarEvents: (): void => {return},
                createEvent: (): void => {throw Error()}
            }
        });

        const date: dayjs.Dayjs = dayjs('2019-12-01');
        const keyakiSchedule: KeyakiSchedule = new KeyakiSchedule();
        expect(() => {keyakiSchedule.setSchedule(date)}).toThrow();
        // @ts-ignore
        expect(Calendar.mock.instances.length).toBe(2);
    });
})
;

function getScheduleJson() {
    return "[{\"title\":\"欅坂46 こちら有楽町星空放送局\",\"start\":\"2019-12-01\",\"className\":\"media\",\"description\":\"欅坂46 こちら有楽町星空放送局\"},{\"title\":\"テレビ東京「欅って、書けない?」\",\"start\":\"2019-12-01\",\"className\":\"media\",\"description\":\"テレビ東京「欅って、書けない?」\"}]";
}
