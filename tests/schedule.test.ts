import MockDate from 'mockdate';
import Schedule from '../src/schedule';
import KeyakiSchedule from '../src/keyakizaka/keyakiSchedule';
import Trigger from '../src/lib/trigger';

jest.mock('../src/keyakizaka/keyakiSchedule');
jest.mock('../src/lib/trigger');
describe('setSchedule', (): void => {
  beforeEach(() => {
    MockDate.set(new Date('2019-12-10'));
    jest.spyOn(console, 'info').mockImplementation();
    jest.resetAllMocks();
  });
  it('setScheduleが12回呼ばれ1年分の予定が作成されること', async () => {
    await Schedule.setSchedule();
    expect(KeyakiSchedule.setSchedule).toBeCalledTimes(12);
  });
  it('propertiesに日付がセットされていた場合にその日付からスケジュール登録が始まること', async () => {
    Trigger.getTargetDateProperty = jest.fn().mockReturnValueOnce('2020-01-01');
    await Schedule.setSchedule();
    expect(KeyakiSchedule.setSchedule).toBeCalledTimes(11);
  });
  it('実行時間が指定時間を過ぎていたらトリガーがセットされ処理が終わること', async () => {
    Trigger.hasExceededTerminationMinutes = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    Trigger.setTrigger = jest.fn().mockReturnThis();
    await Schedule.setSchedule();
    expect(KeyakiSchedule.setSchedule).toBeCalledTimes(2);
    expect(Trigger.setTrigger).toBeCalledTimes(1);
  });
  it('指定時間内に全て実行出来たらdeleteTargetDatePropertyとdeleteTriggersが呼ばれること', async () => {
    Trigger.hasExceededTerminationMinutes = jest.fn().mockReturnValue(false);
    Trigger.setTrigger = jest.fn().mockReturnThis();
    Trigger.deleteTargetDateProperty = jest.fn().mockReturnThis();
    Trigger.deleteTriggers = jest.fn().mockReturnThis();
    await Schedule.setSchedule();
    expect(KeyakiSchedule.setSchedule).toBeCalledTimes(12);
    expect(Trigger.setTrigger).not.toBeCalled();
    expect(Trigger.deleteTargetDateProperty).toBeCalledTimes(1);
    expect(Trigger.deleteTriggers).toBeCalledTimes(1);
  });
});
