const {By, Builder, until, Key} = require('selenium-webdriver');
const { createDriver } = require('./driverFactory.js');
const assert = require("assert");
const studentUser = process.env.STUDENT_USER;
const studentPass = process.env.STUDENT_PASS;

describe('First script', function () {
  let driver;

  beforeAll(async function () {
    // driver = await new Builder().forBrowser('firefox').build();
    driver = await createDriver();
  });

  it('should lead to the lokwi page', async function () {
    await driver.get('https://microforge.bulme.at/lokwi-1.5/');

    await until.urlContains("https://microforge.bulme.at/lokwi-1.5/");
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
