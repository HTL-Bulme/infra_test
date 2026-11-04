const { By, until } = require('selenium-webdriver');
const { createDriver } = require('./driverFactory');

describe('BULME Webmail Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  }, 60000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

    test('Webmail-Seite ist erreichbar', async () => {
      await driver.get('https://webmail.bulme.at');

      expect(await driver.getTitle()).toBeTruthy();
    });

    test('Login mit Verification', async () => {

      const user = await driver.wait(until.elementLocated(By.id('rcmloginuser')), 15000);
      const pwd = await driver.findElement(By.id('rcmloginpwd'));


      await user.sendKeys(process.env.WEBMAIL_USER);
      await pwd.sendKeys(process.env.WEBMAIL_PASS);
      await driver.findElement(By.id('rcmloginsubmit')).click();


      await driver.wait(until.elementLocated(By.css('body.task-mail')), 30000);
      expect(await driver.findElement(By.css('body')).getText()).toContain('ttt@bulme.at');
    }, 90000);
});
