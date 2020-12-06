const puppeteer = require('puppeteer');

(async () => {
    let text = "";
    let json = {};
    const browser = await puppeteer.launch();
    //const browser = puppeteer.launch({product: 'firefox'});
    const page = await browser.newPage();
    page.on('console', msg => {
        text = msg.text().replace(/\:/g, ": ").replace(/,/g, ", ");
        try {
            json = JSON.parse(msg.text());
            if (json.failed) {
                console.log(json);
                page.goto(json.fetch);
                browser.close();
            }
        }
        catch {
            console.log(`${msg.text()} (not parsed)`);
        }
    });
    await page.goto('http://localhost:8989/2020-06-20-colour-match-api/#3');
    const canvasElement = await page.$('canvas');
    await page.waitForTimeout(1000);
    await canvasElement.screenshot({
        path: `${json.cc_id}.png`,
        omitBackground: true,
    });
    console.log(text);

    await browser.close();
})();