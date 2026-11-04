const { By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { createDriver } = require('./driverFactory');

const timeout = 30000;
jest.setTimeout(30000);

describe('Letto Login Tests (Jest + Selenium + Firefox)', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
    
    await driver.get('https://sandbox.bulme.at');
  }, timeout);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });


 test('should verify redircect, ', async () => {
  await timeout ;
  const schuleBtn = await driver.wait(
    until.elementLocated(By.xpath('//*[contains(text(), "Ibererstraße 15 – 21, 8051 Graz")]')),
    10000
  );
    expect(await schuleBtn.isDisplayed()).toBe(true);
  }, timeout);









  });