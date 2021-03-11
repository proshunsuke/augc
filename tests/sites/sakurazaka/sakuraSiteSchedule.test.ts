import MockDate from 'mockdate';
import SakuraSiteSchedule from '../../../src/sites/sakurazaka/sakuraSiteSchedule';
import OneMonthSchedule from '../../../src/oneMonthSchedule';

jest.mock('../../../src/oneMonthSchedule');
jest.mock('../../../src/lib/trigger');
describe('setSiteSchedule', (): void => {
  beforeEach(() => {
    MockDate.set(new Date('2019-12-10'));
    jest.spyOn(console, 'info').mockImplementation();
    jest.resetAllMocks();
  });
  it('setScheduleが12回呼ばれ1年分の予定が作成されること', async () => {
    const sakuraSiteSchedule = new SakuraSiteSchedule();
    await sakuraSiteSchedule.setSiteSchedule();
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(12);
  });
});
