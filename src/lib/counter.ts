export default class Counter {
  private static instance: Counter;

  private createEventCallCount;

  private deleteEventCallCount;

  private constructor() {
    this.createEventCallCount = 0;
    this.deleteEventCallCount = 0;
  }

  public static get getInstance(): Counter {
    if (!this.instance) {
      this.instance = new Counter();
    }

    return this.instance;
  }

  public incrementCreateEventCallCount(): void {
    this.createEventCallCount += 1;
  }

  public getCreateEventCallCount(): number {
    return this.createEventCallCount;
  }

  public incrementDeleteEventCallCount(): void {
    this.deleteEventCallCount += 1;
  }

  public getDeleteEventCallCount(): number {
    return this.deleteEventCallCount;
  }
}
