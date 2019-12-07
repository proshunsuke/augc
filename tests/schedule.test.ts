import Schedule from "../src/schedule";
import KeyakiSchedule from "../src/keyakizaka/keyakiSchedule";
import { mocked } from "ts-jest/utils";

jest.mock("../src/keyakizaka/keyakiSchedule");
describe("setSchedule", (): void => {
    beforeEach(() => {
        mocked(KeyakiSchedule).mockClear()
    });
    it("setScheduleが12回呼ばれ1年分の予定が作成されること", (): void => {
        const schedule: Schedule = new Schedule();
        schedule.setSchedule();
        // @ts-ignore
        expect(KeyakiSchedule.mock.instances[0].setSchedule).toBeCalledTimes(12);
    })
});
