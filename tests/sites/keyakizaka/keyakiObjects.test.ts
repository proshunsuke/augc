describe('getKeyakiCalendarUrl', (): void => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('production環境ではcloud functionのURLが返ること', async () => {
    const keyakiObjects = await import(
      '../../../src/sites/keyakizaka/keyakiObjects'
    );
    expect(keyakiObjects.getKeyakiCalendarUrl).toMatch(/cloudfunctions/);
  });
  it('production環境では無かった場合にlocalhostのURLが返ること', async () => {
    process.env.ENV = 'local';
    const keyakiObjects = await import(
      '../../../src/sites/keyakizaka/keyakiObjects'
    );
    expect(keyakiObjects.getKeyakiCalendarUrl).toMatch(/localhost/);
  });
});
