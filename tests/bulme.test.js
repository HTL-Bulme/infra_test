const { By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { createDriver } = require('./driverFactory');

const timeout = 30000;

describe('Bulme Website Test (Jest + Selenium + Firefox)', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();

    // Ensure your Vite app is running via `npm run dev` on port 5173
    await driver.get('https://www.bulme.at');
  }, timeout);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('should load the Bulme application header', async () => {
    const header = await driver.findElement(By.css('h1'));
    const text = await header.getText();
    expect(text).toBe('DEINE AUSBILDUNG\nMIT ZUKUNFT!');
  });

});

