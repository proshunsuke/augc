import dayjs from 'dayjs';
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
  it('サイトの1年分のスケジュールが登録された場合は次のスケジュール登録は実行されずsetScheduleは12回実行されること', async () => {
    await Schedule.setSchedule(dayjs());
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(12);
  });
  it('propertiesに日付がセットされていた場合にその日付からスケジュール登録が始まること', async () => {
    Trigger.getTargetDateProperty = jest.fn().mockReturnValueOnce('2020-01-01');
    await Schedule.setSchedule(dayjs());
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(11);
  });
  it('propertiesにサイト名がセットされていた場合にそのサイトからスケジュール登録が始まること', async () => {
    Trigger.getTargetSiteNameProperty = jest
      .fn()
      .mockReturnValueOnce('sakurazaka');
    await Schedule.setSchedule(dayjs());
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(12);
  });
  it('実行時間が指定時間を過ぎていたらトリガーがセットされ処理が終わること', async () => {
    Trigger.hasExceededTerminationMinutes = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    Trigger.setTrigger = jest.fn().mockReturnThis();
    await Schedule.setSchedule(dayjs());
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(2);
    expect(Trigger.setTrigger).toBeCalledTimes(1);
  });
  it('次にスケジュール登録するサイトが存在しない場合にdeleteTargetDatePropertyとdeleteTriggersが呼ばれること', async () => {
    Trigger.hasExceededTerminationMinutes = jest.fn().mockReturnValue(false);
    Trigger.setTrigger = jest.fn().mockReturnThis();
    Trigger.deleteTargetDateProperty = jest.fn().mockReturnThis();
    Trigger.deleteTargetSiteNameProperty = jest.fn().mockReturnThis();
    Trigger.deleteTriggers = jest.fn().mockReturnThis();
    Trigger.getTargetSiteNameProperty = jest
      .fn()
      .mockReturnValueOnce('sakurazaka');
    await Schedule.setSchedule(dayjs());
    expect(OneMonthSchedule.setSchedule).toBeCalledTimes(12);
    expect(Trigger.setTrigger).not.toBeCalled();
    expect(Trigger.deleteTargetDateProperty).toBeCalledTimes(1);
    expect(Trigger.deleteTargetSiteNameProperty).toBeCalledTimes(1);
    expect(Trigger.deleteTriggers).toBeCalledTimes(1);
  });
});
