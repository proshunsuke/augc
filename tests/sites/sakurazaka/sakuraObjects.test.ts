describe('getSakuraCalendarUrl', (): void => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('production環境ではcloud functionのURLが返ること', async () => {
    const sakuraObjects = await import(
      '../../../src/sites/sakurazaka/sakuraObjects'
    );
    expect(sakuraObjects.getSakuraCalendarUrl).toMatch(/cloudfunctions/);
  });
  it('production環境では無かった場合にlocalhostのURLが返ること', async () => {
    process.env.ENV = 'local';
    const sakuraObjects = await import(
      '../../../src/sites/sakurazaka/sakuraObjects'
    );
    expect(sakuraObjects.getSakuraCalendarUrl).toMatch(/localhost/);
  });
});
