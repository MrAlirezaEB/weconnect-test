import puppeteer, {ElementHandle} from 'puppeteer';
import { plugin } from 'puppeteer-with-fingerprints';
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const FORM = {
  USERNAME_SELECTOR: '#session_key',
  PASSWORD_SELECTOR: '#session_password',
  BUTTON_SELECTOR: '.sign-in-form__submit-btn--full-width'
};

const CREDENTIALS = {
  USERNAME: 'mr.alireza.eb@gmail.com',
  PASSWORD: 'P13435322@@a'
};

const profiles = [
    'https://www.linkedin.com/in/reyhaneh-ebrahiminasab-a76a90218/'
]

const isWin = ["win32", "win64"].includes(process.platform);


(async () => {
  // const fingerprint = await plugin.fetch('', {
  //   tags: ['Microsoft Windows', 'Chrome'],
  // });
  //
  // plugin.useFingerprint(fingerprint);

  // const browser = await plugin.launch();
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/', {waitUntil: 'domcontentloaded'});
  await page.click(FORM.USERNAME_SELECTOR);
  await page.keyboard.type(CREDENTIALS.USERNAME);
  await page.click(FORM.PASSWORD_SELECTOR);
  await page.keyboard.type(CREDENTIALS.PASSWORD);
  await page.click(FORM.BUTTON_SELECTOR);
  await page.waitForNavigation({waitUntil: 'domcontentloaded'});
  // const answer = await rl.question('Is this example useful? [y/n]');
  // console.log(answer);
  await page.goto(profiles[0], {waitUntil: 'load'})
  const [button] = await page.$x("//button[contains(., 'Connect')]");
  console.log(button);
  if(button) {
    await (button as ElementHandle<Element>).click();
  }
  await page.screenshot({path: `after.png`, fullPage: false});
  browser.close();
})();
