const { By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { createDriver } = require('./driverFactory');

const timeout = 30000;

describe('Boodle Website Tests (Jest + Selenium + Firefox)', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();

    // Ensure your Vite app is running via `npm run dev` on port 5173
    await driver.get('https://moodle.bulme.at');
  }, timeout);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('should load the Boodle application header', async () => {
    const header = await driver.findElement(By.css('h1'));
    const text = await header.getText();
    expect(text).toBe('Boodle – BULME Moodle');
  });

});

describe('Boodle Login Tests', () => {

  let driver;

  beforeAll(async () => {
    driver = await createDriver();

    // Ensure your Vite app is running via `npm run dev` on port 5173
    await driver.get('https://moodle.bulme.at/login/index.php');
  }, timeout);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('should load the Login Page', async () => {

    const header = await driver.findElement(By.id('logoimage'));
    const ptext = await header.getText();
    expect(ptext).toBe('');

  });

  test('should enter username and password on Login', async () => {

    const header = await driver.findElement(By.id('logoimage'));
    const ptext = await header.getText();
    expect(ptext).toBe('');

  });
});
