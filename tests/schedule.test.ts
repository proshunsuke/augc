import Schedule from "../src/schedule";
import KeyakiSchedule from "../src/keyakizaka/keyakiSchedule";
import Trigger from "../src/lib/trigger";
import MockDate from 'mockdate'

jest.mock("../src/keyakizaka/keyakiSchedule");
jest.mock("../src/lib/trigger");
describe("setSchedule", (): void => {
    beforeEach(() => {
        MockDate.set(new Date('2019-12-10'));
        // @ts-ignore
        KeyakiSchedule.mockClear();
        // @ts-ignore
        Trigger.mockClear();
    });
    it("setScheduleが12回呼ばれ1年分の予定が作成されること", (): void => {
        const schedule: Schedule = new Schedule();
        schedule.setSchedule();
        // @ts-ignore
        expect(KeyakiSchedule.mock.instances[0].setSchedule).toBeCalledTimes(12);
    });
    it("propertiesに日付がセットされていた場合にその日付からスケジュール登録が始まること", () => {
        Trigger.getTargetDateProperty = jest.fn().mockReturnValueOnce('2020-01-01');
        const schedule: Schedule = new Schedule();
        schedule.setSchedule();
        // @ts-ignore
        expect(KeyakiSchedule.mock.instances[0].setSchedule).toBeCalledTimes(11);
    });
    it("実行時間が指定時間を過ぎていたらトリガーがセットされ処理が終わること", () => {
        Trigger.hasExceededTerminationMinutes = jest.fn()
            .mockReturnValueOnce(false)
            .mockReturnValue(true);
        Trigger.setTrigger = jest.fn().mockReturnThis();
        const schedule: Schedule = new Schedule();
        schedule.setSchedule();
        // @ts-ignore
        expect(KeyakiSchedule.mock.instances[0].setSchedule).toBeCalledTimes(2);
        expect(Trigger.setTrigger).toBeCalledTimes(1);
    });
    it("指定時間内に全て実行出来たらdeleteTargetDatePropertyが呼ばれること", () => {
        Trigger.hasExceededTerminationMinutes = jest.fn().mockReturnValue(false);
        Trigger.setTrigger = jest.fn().mockReturnThis();
        Trigger.deleteTargetDateProperty = jest.fn().mockReturnThis();
        const schedule: Schedule = new Schedule();
        schedule.setSchedule();
        // @ts-ignore
        expect(KeyakiSchedule.mock.instances[0].setSchedule).toBeCalledTimes(12);
        expect(Trigger.setTrigger).not.toBeCalled();
        expect(Trigger.deleteTargetDateProperty).toBeCalledTimes(1);
    });
});
