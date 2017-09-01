module.exports = async (path) => {
  const puppeteer = require('puppeteer');

  try {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

    const page = await browser.newPage();

    page.on('pageerror', (...args) => {
      console.log('PAGE ERROR:', ...args);
      process.exit(1);
    });

    await page.goto('file://' + path);

    browser.close();
    console.log('successfully validated');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
