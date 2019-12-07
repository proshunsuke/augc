import schedule from "../src/schedule";
import { mocked } from "ts-jest/utils";
import { execute } from "../src";

jest.mock("../src/schedule");
describe("execute", (): void => {
    beforeEach(() => {
        mocked(schedule).mockClear()
    });
    it("executeが呼ばれるとschedule.setScheduleが1回呼ばれること", (): void => {
        execute();
        // @ts-ignore
        expect(schedule.mock.instances[0].setSchedule).toBeCalledTimes(1);
    })
});
