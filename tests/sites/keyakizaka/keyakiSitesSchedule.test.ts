import MockDate from 'mockdate';
import KeyakiSiteSchedule from '../../../src/sites/keyakizaka/keyakiSiteSchedule';
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
    const keyakiSiteSchedule = new KeyakiSiteSchedule();
    await keyakiSiteSchedule.setSiteSchedule();
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(12);
  });
});
