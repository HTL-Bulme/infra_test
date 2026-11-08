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

    const image = await driver.findElement(By.id('logoimage'));
    const pic_link = await image.getText();
    expect(pic_link).toBe('https://moodle.bulme.at/pluginfile.php/1/theme_boo…_union/logo/0x200/1793961534/BULME_LOGO_Black.png');

  });

  test('should enter the Username and Password into the boxes', async () => {
    const inputu = await driver.findElement(By.id('username'));
    const textu = '$STUDENT_USER';
    await inputu.sendKeys(textu);

    const inputp = await driver.findElement(By.id('password'));
    const textp = '$STUDENT_PASS';
    await inputp.sendKeys(textp);

    const button = await driver.findElement(By.id('loginbtn'));
    await button.click();

    // Wait for the new task item to render
    const taskItem = await driver.wait(
      until.urlContains('https://moodle.bulme.at/my/'), 5000);

  });
});
