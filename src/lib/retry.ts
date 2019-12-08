export default class Retry{
    /**
     * GAS内で使用できるAPIのリトライ処理
     *
     * @param retryCount
     * @param func
     */
    static retryable(retryCount: number, func: Function){
        let lastError = null;
        for (let i=0; i < retryCount; i++) {
            try {
                return func();
            } catch (e) {
                lastError = e;
                console.log("エラーが起きました。リトライを行います。message: " + e.message + ", リトライ" + i.toString() + "回目");
            }
        }
        throw lastError;
    }
}
