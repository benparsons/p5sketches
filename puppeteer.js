const puppeteer = require('puppeteer');

(async () => {
    let text = "";
    const browser = await puppeteer.launch();
    //const browser = puppeteer.launch({product: 'firefox'});
    const page = await browser.newPage();
    page.on('console', msg => {
        console.log(msg.text());
        text = msg.text().replace(/\:/g, ": ").replace(/,/g, ", ");
    });
    await page.goto('http://localhost:8989/2020-06-20-colour-match-api/#3');
    const canvasElement = await page.$('canvas');
    await canvasElement.screenshot({
        path: "out.png",
        omitBackground: true,
    });
    console.log(text);

    await browser.close();
})();