import MockDate from 'mockdate'
import Trigger from "../../src/lib/trigger";
import dayjs = require("dayjs");

beforeEach(() => {
    MockDate.set(new Date('2019-12-10'))
});

describe("hasExceededTerminationMinutes", (): void => {
    it("現在時刻が基準時刻を超えている場合にtrueを返すこと", () => {
        const startDate = dayjs('2019-12-09T23:56:00.000Z');
        const result = Trigger.hasExceededTerminationMinutes(startDate);
        expect(result).toBeTruthy();
    });
    it("現在時刻が基準時刻を超えていない場合にfalseを返すこと", () => {
        const startDate = dayjs('2019-12-09T23:56:01.000Z');
        const result = Trigger.hasExceededTerminationMinutes(startDate);
        expect(result).toBeFalsy();
    });
});

describe("setTrigger", (): void => {
    it("setPropertyとcreateが呼ばれること", () => {
        const createMock = jest.fn().mockReturnThis();
        const setPropertyMock = jest.fn().mockReturnThis();

        // @ts-ignore
        PropertiesService.getScriptProperties = jest.fn(() => ({setProperty: setPropertyMock}));

        // @ts-ignore
        ScriptApp.newTrigger = jest.fn(() => ({
            timeBased: jest.fn(() => ({
                after: jest.fn(() => ({
                    create: createMock
                }))
            }))
        }));

        Trigger.setTrigger(dayjs('2019-12-01'));
        expect(setPropertyMock).toBeCalledTimes(1);
        expect(setPropertyMock).toBeCalledWith('target_date', '2019-12-01');
        expect(createMock).toBeCalledTimes(1);
    });
});

describe("getTargetDateProperty", (): void => {
    it("getPropertyが呼ばれること", () => {
        const getPropertyMock = jest.fn().mockReturnValue('2019-12-01');
        // @ts-ignore
        PropertiesService.getScriptProperties = jest.fn(() => ({getProperty: getPropertyMock}));
        const result = Trigger.getTargetDateProperty();
        expect(result).toBe('2019-12-01');
        expect(getPropertyMock).toBeCalledTimes(1);
    });
});

describe("deleteTargetDateProperty", (): void => {
    it("deletePropertyが呼ばれること", () => {
        const deletePropertyMock = jest.fn().mockReturnValueOnce('2019-12-01');
        // @ts-ignore
        PropertiesService.getScriptProperties = jest.fn(() => ({deleteProperty: deletePropertyMock}));
        Trigger.deleteTargetDateProperty();
        expect(deletePropertyMock).toBeCalledTimes(1);
    });
});

describe("deleteTriggers", (): void => {
    it("トリガーの名前がsetScheduleの場合だけdeleteTriggerが呼ばれること", () => {
        const triggerSetScheduleMock = jest.fn(() => ({
            getHandlerFunction: jest.fn(() => 'setSchedule')
        }));
        const triggerNotSetScheduleMock = jest.fn(() => ({
            getHandlerFunction: jest.fn(() => 'notSetSchedule')
        }));

        ScriptApp.getProjectTriggers = jest.fn().mockReturnValue([
            triggerSetScheduleMock(),
            triggerNotSetScheduleMock(),
            triggerSetScheduleMock()
        ]);
        ScriptApp.deleteTrigger = jest.fn().mockReturnThis();
        Trigger.deleteTriggers();
        expect(ScriptApp.deleteTrigger).toBeCalledTimes(2);
    });
});
