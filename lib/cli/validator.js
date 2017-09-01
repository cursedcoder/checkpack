module.exports = async (path) => {
  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('pageerror', (...args) => {
    console.log('PAGE ERROR:', ...args);
    process.exit(1);
  });

  await page.goto('file://' + path);

  browser.close();
  console.log('successfully validated');
};
