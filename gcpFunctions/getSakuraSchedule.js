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

    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1');

    const yearMonth = req.query['date'] ? req.query['date'].substring(0, req.query['date'].length - 2) : '';
    const url = 'https://sakurazaka46.com/s/s46/media/list?ima=5250&dy=' + yearMonth;
    await page.goto(url);

    const modalScheduleDetails = await page.$$('.module-modal.js-schedule-detail');
    let result = await modalScheduleDetails.reduce(async (list, modalScheduleDetail) => {
        const l = (await list);
        const date = await (await modalScheduleDetail.$('.date.wf-a')).evaluate((el) => el.textContent);
        const title = await (await modalScheduleDetail.$('.title')).evaluate((el) => el.textContent);
        const members = await Promise.all(
            (await modalScheduleDetail.$$('.members.fx > li')).map(async (li) => await li.evaluate((el) => el.textContent))
        );
        const scheduleObject = {title, date};
        if (members.length !== 0) scheduleObject.description = `メンバー: ${members.join(', ')}`;
        l.push(scheduleObject);
        return l;
    }, []);

    const scheduleDetailModals = await page.$$('.js-schedule-detail-modal');
    result = await scheduleDetailModals.reduce(async (list, scheduleDetailModal, index) => {
        const l = await list;
        const type = await (await scheduleDetailModal.$('.type')).evaluate((el) => el.textContent) || 'その他';
        const times = await (await scheduleDetailModal.$('.times')).evaluate((el) => el.textContent);

        let scheduleObject = {type};
        if (times) scheduleObject = {...scheduleObject, ...startEndTimeObject(l[index].date, times)};

        l[index] = {...l[index], ...scheduleObject};
        return l;
    }, result);

    res.send(result);
};

function startEndTimeObject(date, times) {
    const startTime = formattedDate(date, times.replace(/～.*/, ''));
    const endTimeHourMin = times.replace(/.*～/, '');
    const endTime = endTimeHourMin ? formattedDate(date, endTimeHourMin) : startTime;
    return {startTime, endTime};
}

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
