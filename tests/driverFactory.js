const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

async function createDriver() {
  const options = new firefox.Options();

  if (process.env.HEADLESS !== 'false') {
    options.addArguments('-headless');

    options.windowSize({ width: 1920, height: 1080 });
  }

  const driver = await new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();

  return driver;
}

module.exports = { createDriver };
