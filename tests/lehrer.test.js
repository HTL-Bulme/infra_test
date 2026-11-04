const { By, until } = require('selenium-webdriver');
const { createDriver } = require('./driverFactory');

describe('Lehrer-Plattform Tests', () => {
  let driver;


  beforeAll(async () => {
    driver = await createDriver();
  }, 60000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

    test('lehrer.bulme.at ist erreichbar', async () => {
      await driver.get('https://lehrer.bulme.at/');
      await driver.wait(until.elementLocated(By.css('body')), 15000);


      expect(await driver.getCurrentUrl()).toContain('lehrer.bulme.at');
    }, 60000);

    test('autotest.txt enthält PASSED', async () => {
      await driver.get('https://lehrer.bulme.at/~sg/autotest.txt');
      const body = await driver.wait(until.elementLocated(By.css('body')), 15000);


      expect(await body.getText()).toContain('PASSED');
    }, 60000);
});
