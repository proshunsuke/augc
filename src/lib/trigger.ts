import dayjs from 'dayjs';

const TARGET_DATE_KEY = 'target_date';
const TARGET_SITE_NAME_KEY = 'site_name';
export const TERMINATION_MINUTES = 3;
const TRIGGER_FUNCTION_NAME = 'setSchedule';
const TRIGGER_DURATION: number = 60 * 2000; // 2分後

export default class Trigger {
  /**
   *
   * @param {dayjs.Dayjs} startDate
   * @returns {boolean}
   */
  static hasExceededTerminationMinutes(startDate: dayjs.Dayjs): boolean {
    return dayjs().diff(startDate, 'm') >= TERMINATION_MINUTES;
  }

  /**
   *
   * @param {dayjs.Dayjs} targetDate
   * @param {string} siteName
   */
  static setTrigger(targetDate: dayjs.Dayjs, siteName?: string): void {
    if (process.env.ENV !== 'production') return;
    const properties = PropertiesService.getScriptProperties();
    properties.setProperty(TARGET_DATE_KEY, targetDate.format('YYYY-MM-DD'));
    if (siteName) properties.setProperty(TARGET_SITE_NAME_KEY, siteName);
    ScriptApp.newTrigger(TRIGGER_FUNCTION_NAME)
      .timeBased()
      .after(TRIGGER_DURATION)
      .create();
  }

  /**
   *
   * @returns {string | null}
   */
  static getTargetDateProperty(): string | null {
    if (process.env.ENV !== 'production') return null;
    const properties = PropertiesService.getScriptProperties();
    return properties.getProperty(TARGET_DATE_KEY);
  }

  static deleteTargetDateProperty(): void {
    if (process.env.ENV !== 'production') return;
    const properties = PropertiesService.getScriptProperties();
    properties.deleteProperty(TARGET_DATE_KEY);
  }

  /**
   *
   * @returns {string | null}
   */
  static getTargetSiteNameProperty(): string | null {
    if (process.env.SITE_NAME) return process.env.SITE_NAME;
    if (process.env.ENV !== 'production') return null;
    const properties = PropertiesService.getScriptProperties();
    return properties.getProperty(TARGET_SITE_NAME_KEY);
  }

  static deleteTargetSiteNameProperty(): void {
    if (process.env.ENV !== 'production') return;
    const properties = PropertiesService.getScriptProperties();
    properties.deleteProperty(TARGET_SITE_NAME_KEY);
  }

  static deleteTriggers(): void {
    if (process.env.ENV !== 'production') return;
    ScriptApp.getProjectTriggers().forEach(
      (trigger: GoogleAppsScript.Script.Trigger) => {
        if (trigger.getHandlerFunction() === TRIGGER_FUNCTION_NAME) {
          ScriptApp.deleteTrigger(trigger);
        }
      }
    );
  }
}
