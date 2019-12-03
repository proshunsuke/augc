const puppeteer = require('puppeteer');
let page;

async function getBrowserPage() {
    // Launch headless Chrome. Turn off sandbox so Chrome can run under root.
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    return browser.newPage();
}

exports.getKeyakiSchedule = async (req, res) => {

    if (!page) {
        page = await getBrowserPage();
    }

    await page.goto('https://www.keyakizaka46.com/s/k46o/media/list?dy=' + req.query['date']);

    const result = await page.evaluate("scheduleEvents");

    res.send(result);
};
