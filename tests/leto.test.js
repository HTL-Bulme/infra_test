const { By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { createDriver } = require('./driverFactory');

const timeout = 30000;
jest.setTimeout(30000);

describe('Letto Login Tests (Jest + Selenium + Firefox)', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
    
    await driver.get('https://letto.bulme.at/app/pages/login');
  }, timeout);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });




  // test('should verify login button is present', async () => {
  //   const loginBtn = await driver.wait(
  //     until.elementLocated(By.xpath('//*[contains(text(), "Einloggen")]')),
  //     10000
  //   );
  //   expect(await loginBtn.isDisplayed()).toBe(true);
  // }, timeout);




  test('should proceed login with given account data', async () => {
    const usernameInput = await driver.wait(
      until.elementLocated(By.css('ion-input[name="username"] input')),
      15000
    );
    await usernameInput.sendKeys('benutzername');

    const passwordInput = await driver.wait(
      until.elementLocated(By.css('ion-input[name="password"] input')),
      15000
    );
    await passwordInput.sendKeys('password'),timeout;

    const button = await driver.findElement(By.xpath('//*[contains(text(), "Einloggen")]'));
    await button.click();

    await timeout ;
    
    const errorMessage = await driver.wait(
      until.elementLocated(By.xpath('//*[contains(text(), "Fehler:: username or password incorrect!")]'),
      15000)
    );
  });
});