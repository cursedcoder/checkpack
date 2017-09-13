module.exports = async (compilerName, path) => {
  const puppeteer = require('puppeteer');
  const chalk = require('chalk');
  const logger = require('../logger');

  try {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

    const page = await browser.newPage();

    page.on('pageerror', (...args) => {
      logger.errorType(compilerName, 'runtime', ...args);
      process.exit(1);
    });

    await page.goto('file://' + path);

    browser.close();

    logger.success(compilerName, 'Successfully validated.\n');
  } catch (e) {
    logger.errorType(compilerName, 'validator', e);
    process.exit(1);
  }
};
