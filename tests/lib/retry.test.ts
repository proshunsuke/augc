import Retry from "../../src/lib/retry";

describe("retryable", (): void => {
    beforeEach(() => {
        jest.spyOn(console, "info").mockImplementation();
    });
    it("例外が起きない場合はそのまま実行されて値が返ること", (): void => {
        const mockFunc = jest.fn();
        mockFunc.mockReturnValueOnce(1);
        expect(Retry.retryable(3, () => {
            return mockFunc();
        })).toBe(1);
    });
    it("例外が起きてもその後成功すると値が返ること", () => {
        const mockFunc = jest.fn();
        mockFunc
            .mockImplementationOnce(() => { throw Error()})
            .mockImplementationOnce(() => { return 1});
        expect(Retry.retryable(3, () => {
            return mockFunc();
        })).toBe(1);
    });
    it("最大回数リトライしても失敗する場合はそのまま例外が返ること", () => {
        const mockFunc = jest.fn();
        mockFunc
            .mockImplementationOnce(() => { throw Error("1回目のエラー")})
            .mockImplementationOnce(() => { throw Error("2回目のエラー")})
            .mockImplementationOnce(() => { throw Error("3回目のエラー")});
        expect(() => {Retry.retryable(3, () => {
            return mockFunc();
        })}).toThrow('3回目のエラー');
    })
});
