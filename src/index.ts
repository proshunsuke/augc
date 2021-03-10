import dayjs from 'dayjs';
import Schedule from './schedule';
import Trigger from './lib/trigger';
import 'regenerator-runtime';

declare const global: {
  [x: string]: () => void | Promise<void>;
};

global.createSetScheduleTrigger = (): void => {
  console.info('スケジュール更新のトリガーを作成します');
  Trigger.setTrigger(dayjs());
  console.info('スケジュール更新のトリガーを作成しました');
};

global.setSchedule = async (): Promise<void> => {
  console.info('スケジュール更新を開始します');
  await Schedule.setSchedule();
  console.info('スケジュール更新が完了しました');
};

export const { createSetScheduleTrigger } = global;
export const { setSchedule } = global;
