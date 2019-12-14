export default class Retry{
    /**
     * GAS内で使用できるAPIのリトライ処理
     *
     * @param {number} retryCount
     * @param {Function} func
     * @returns {any}
     */
    static retryable(retryCount: number, func: Function){
        let lastError = null;
        for (let i=0; i < retryCount; i++) {
            try {
                return func();
            } catch (e) {
                lastError = e;
                console.info("エラーが起きました。リトライを行います。message: " + e.message + ", リトライ" + i.toString() + "回目");
            }
        }
        throw lastError;
    }
}
