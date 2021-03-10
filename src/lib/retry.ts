export default class Retry {
  /**
   * GAS内で使用できるAPIのリトライ処理
   *
   * @param {number} retryCount
   * @param {Function} func
   * @returns {any}
   */
  static retryable<E>(retryCount: number, func: () => E): E {
    let lastError: unknown = null;
    for (let i = 0; i < retryCount; i += 1) {
      try {
        return func();
      } catch (e) {
        lastError = e;
        const message = e instanceof Error ? e.message : 'error';
        console.info(
          `エラーが起きました。リトライを行います。message: ${message}, リトライ${i.toString()}回目`
        );
      }
    }
    throw lastError;
  }
}
