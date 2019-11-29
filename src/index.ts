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

global.onOpen = function(e: any) {
    return testGreeter();
};

global.onInstall = function(e: any) {
    global.onOpen(e)
};