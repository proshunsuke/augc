import Schedule from "../src/schedule";
import Trigger from "../src/lib/trigger";
import { createSetScheduleTrigger, setSchedule } from "../src";

jest.mock("../src/schedule");
jest.mock("../src/lib/trigger");
describe("execute", (): void => {
    beforeEach(() => {
        jest.spyOn(console, "info").mockImplementation();
        jest.resetAllMocks();
    });
    it("createSetScheduleTriggerが呼ばれるとTrigger.setTriggerが1回呼ばれること", (): void => {
        createSetScheduleTrigger();
        expect(Trigger.setTrigger).toBeCalledTimes(1);
    });
    it("setScheduleが呼ばれるとschedule.setScheduleが1回呼ばれること", (): void => {
        setSchedule();
        // @ts-ignore
        expect(Schedule.setSchedule).toBeCalledTimes(1);
    })
});
