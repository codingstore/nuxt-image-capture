import puppeteer from "puppeteer";
import { parse } from "node-html-parser";

const router = require('express').Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/', (req, res, next) => {
    res.send('plase use post')
});

/*
fetch('/api/toimage',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a: 1 })
    }
)  
*/
/*
router.post('/', (req, res, next) => {
    console.log(req.body?.a)
    res.send('hello')
});
*/
router.post('/', async (req, res, next) => {

    try {
        //이미지로 렌더링할 html
        const html = req.body.html;
        const width = req.body.scrollWidth;
        const height = req.body.scrollHeight;
        const selector = req.body.selector || "#__nuxt";
        const parsedDocument = parse(html);

        const browser = await puppeteer.launch({ headless: true, devtools: false });
        const page = await browser.newPage();
        await page.setCacheEnabled(false);
        await page.setViewport({ width, height, deviceScaleFactor: 2 });
        //모든 리소스가 다 로드될때까지 대기

        await page.setContent(parsedDocument.toString(), { waitUntil: "load" });

        const element = await page.$(selector);
        if (!element) {
            throw Error(`No element matches selector: ${selector}`);
        }

        //전체 페이지 스크린샷
        const buffer = await element.screenshot({
            fullPage: false,
            type: "png",
            encoding: "binary",
            clip: undefined,
        });
        //이미지 리턴
        res.status(200).setHeader("Content-Type", "image/png").send(buffer);
    } catch (e) {
        console.log(e);
        throw e;
    }

});


router.post('/test', (req, res, next) => {

    res.status(200).setHeader("Content-Type", "image/png").send(buffer);
});

module.exports = router

