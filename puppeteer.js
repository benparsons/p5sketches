const puppeteer = require('puppeteer');
let config = require('./config');
const fs = require('fs');

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
    await page.goto('http://localhost:8989/2020-06-20-colour-match-api/#3', { 
        waitUntil: 'domcontentloaded'
    });
    await page.waitForSelector('canvas', {
        visible: true
    });

    const canvasElement = await page.$('canvas');
    let filename = `${json.cc_id}.png`;
    await canvasElement.screenshot({
        path:filename,
        omitBackground: true,
    });

    console.log(config);
    
    console.log("replacing config.image_filename, was:");
    console.log(config.image_filename);
    config.image_filename = filename;

    console.log("replacing config.status_text, was:");
    console.log(config.status_text);
    config.status_text = text;
    fs.writeFileSync('config.json', JSON.stringify(config, null, 2));

    await browser.close();
})();