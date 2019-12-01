import { Test } from './test'

const greeter = (person: string) => {
    return `Hello, ${person}!`;
};

// @ts-ignore
function testGreeter() {
    const test = new Test();
    const user = 'Grant';
    Logger.log(greeter(user)+test.test());
}

// プロパティが無いと言われるのを防ぐ程度の型定義
declare const global: {
  [x: string]: any ;
}

global.testGreeter = function(e: any) {
    return testGreeter();
};
