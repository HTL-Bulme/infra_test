const { By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { createDriver } = require('./driverFactory');

const timeout = 30000;
jest.setTimeout(30000);

describe('PASSED displayed Test (Jest + Selenium + Firefox)', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
    
    await driver.get('https://sandbox.bulme.at/~sg/autotest.txt');
  }, timeout);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });


 test('should verify PASSED-Text is displayed', async () => {
  const passedElement = await driver.wait(
    until.elementLocated(By.xpath('//*[contains(text(), "PASSED")]')),
    10000
  );
    expect(await passedElement.isDisplayed()).toBe(true);
  }, timeout);









  });