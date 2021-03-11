const puppeteer = require('puppeteer');
let page;

async function getBrowserPage() {
    // Launch headless Chrome. Turn off sandbox so Chrome can run under root.
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    return browser.newPage();
}

exports.getSakuraSchedule = async (req, res) => {

    if (!page) {
        page = await getBrowserPage();
    }

    await page.goto('https://sakurazaka46.com/s/s46/media/list?dy=' + req.query['date']);

    const scheduleEvents = await page.evaluate("scheduleEvents");

    const scheduleDateList = Array.from(new Set(scheduleEvents.map((scheduleEvent) => scheduleEvent.start.replace(/-/g, ''))));

    const result = [];

    for await (const scheduleDate of scheduleDateList) {
        await page.goto('https://sakurazaka46.com/s/s46/media/list?dy=' + scheduleDate);
        const scheduleContexts = await page.$$('.com-arclist-part li.box');
        for (const scheduleContext of scheduleContexts) {
            const type = await (await scheduleContext.$('.type')).evaluate((el) => el.textContent) || 'その他';
            const times = await (await scheduleContext.$('.times')).evaluate((el) => el.textContent);
            const modalCount = (await (await scheduleContext.$('.js-schedule-detail-modal')).evaluate((el) => el.href)).replace(/^.*#/g, '');
            const date = await (await page.$(`.${modalCount} .date.wf-a`)).evaluate((el) => el.textContent);
            const title = await (await page.$(`.${modalCount} .title`)).evaluate((el) => el.textContent);
            const members = await Promise.all(
                (await page.$$(`.${modalCount} .members.fx > li`)).map(async (liElement) => await liElement.evaluate((el) => el.textContent))
            );
            const scheduleObject = {title: title, date: date, type: type};
            if (times) {
                const startTime = formattedDate(date, times.replace(/～.*/, ''));
                const endTimeHourMin = times.replace(/.*～/, '');
                const endTime = endTimeHourMin ? formattedDate(date, endTimeHourMin) : startTime;
                scheduleObject.startTime = startTime;
                scheduleObject.endTime = endTime;
            }
            if (members.length !== 0) scheduleObject.description = `メンバー: ${members.join(', ')}`;
            result.push(scheduleObject);
        }
    }

    res.send(result);
};

function formattedDate(date, hourMin) {
    if ((new Date(`${date} ${hourMin}`)).toString() !== 'Invalid Date') return `${date} ${hourMin}`;
    const hour = parseInt(hourMin.replace(/:.*/, ''));
    const min = parseInt(hourMin.replace(/.*:/, ''));
    const nextDayHour = hour - 24;
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(nextDayHour);
    targetDate.setMinutes(min);
    return `${targetDate.getFullYear()}.${(targetDate.getMonth()+1).toString().padStart(2, '0')}.${targetDate.getDate().toString().padStart(2, '0')} ${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`
}
