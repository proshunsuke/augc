import MockDate from 'mockdate';
import Schedule from '../src/schedule';
import OneMonthSchedule from '../src/oneMonthSchedule';
import Trigger from '../src/lib/trigger';

jest.mock('../src/oneMonthSchedule');
jest.mock('../src/lib/trigger');
describe('setSchedule', (): void => {
  beforeEach(() => {
    MockDate.set(new Date('2019-12-10'));
    jest.spyOn(console, 'info').mockImplementation();
    jest.resetAllMocks();
  });
  it('setScheduleが24回呼ばれ各サイト1年分の予定が作成されること', async () => {
    await Schedule.setSchedule();
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(24);
  });
  it('propertiesに日付がセットされていた場合にその日付からスケジュール登録が始まること', async () => {
    Trigger.getTargetDateProperty = jest.fn().mockReturnValueOnce('2020-01-01');
    await Schedule.setSchedule();
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(23);
  });
  it('実行時間が指定時間を過ぎていたらトリガーがセットされ処理が終わること', async () => {
    Trigger.hasExceededTerminationMinutes = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    Trigger.setTrigger = jest.fn().mockReturnThis();
    await Schedule.setSchedule();
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(3);
    expect(Trigger.setTrigger).toBeCalledTimes(2);
  });
  it('指定時間内に全て実行出来たらdeleteTargetDatePropertyとdeleteTriggersが呼ばれること', async () => {
    Trigger.hasExceededTerminationMinutes = jest.fn().mockReturnValue(false);
    Trigger.setTrigger = jest.fn().mockReturnThis();
    Trigger.deleteTargetDateProperty = jest.fn().mockReturnThis();
    Trigger.deleteTriggers = jest.fn().mockReturnThis();
    await Schedule.setSchedule();
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(24);
    expect(Trigger.setTrigger).not.toBeCalled();
    expect(Trigger.deleteTargetDateProperty).toBeCalledTimes(2);
    expect(Trigger.deleteTriggers).toBeCalledTimes(2);
  });
});
