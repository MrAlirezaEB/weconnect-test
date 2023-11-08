import puppeteer from 'puppeteer';
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

const isWin = ["win32", "win64"].includes(process.platform);


(async () => {
  // const fingerprint = await plugin.fetch('', {
  //   tags: ['Microsoft Windows', 'Chrome'],
  // });
  //
  // plugin.useFingerprint(fingerprint);

  // const browser = await plugin.launch();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/', {waitUntil: 'networkidle0'});
  await page.screenshot({path: `before-login.png`, fullPage: true});
  await page.click(FORM.USERNAME_SELECTOR);
  await page.keyboard.type(CREDENTIALS.USERNAME);
  await page.click(FORM.PASSWORD_SELECTOR);
  await page.keyboard.type(CREDENTIALS.PASSWORD);
  await page.click(FORM.BUTTON_SELECTOR);
  const answer = await rl.question('Is this example useful? [y/n]');
  console.log(answer);
  await page.screenshot({path: `in-login.png`, fullPage: true});
  await page.waitForNavigation();
  await page.screenshot({path: `after-login.png`, fullPage: true});

  browser.close();
})();
