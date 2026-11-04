// in terminal before running  (for whole terminal session)
// export STUDENT_USER=???
// export STUDENT_PASS=???

// npm run test
// HEADLESS=false npm run test

const { By, until } = require('selenium-webdriver');
const { createDriver } = require('./driverFactory');

const timeout = 30000;
const { STUDENT_USER, STUDENT_PASS } = process.env;

const SEL = {
  user: By.id('rcmloginuser'),
  pass: By.id('rcmloginpwd'),
  submit: By.id('rcmloginsubmit'),
  loggedIn: By.css('a.logout, #layout'),
};

describe('mymail.bulme.at (Jest + Selenium + Firefox)', () => {
  let driver;

  beforeAll(async () => {
    if (!STUDENT_USER || !STUDENT_PASS) {
      throw new Error('STUDENT_USER and STUDENT_PASS must be set');
    }
    driver = await createDriver();
  }, timeout);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('should log in and verify the session', async () => {
    await driver.get('https://mymail.bulme.at');
    await driver.findElement(SEL.user).sendKeys(STUDENT_USER);
    await driver.findElement(SEL.pass).sendKeys(STUDENT_PASS);
    await driver.findElement(SEL.submit).click();

    const logout = await driver.wait(until.elementLocated(SEL.loggedIn), 15000);
    expect(await logout.isDisplayed()).toBe(true);
  }, timeout);

  test('should load schueler.bulme.at', async () => {
    await driver.get('https://schueler.bulme.at/');
    expect(await driver.getTitle()).toBe('BULME Schuelerweb');
  }, timeout);

  test('should serve autotest.txt', async () => {
    await driver.get('https://schueler.bulme.at/~sg.test/autotest.txt');
    const text = await driver.findElement(By.css('pre')).getText();
    expect(text.trim()).toBe('PASSED');
  }, timeout);
});
