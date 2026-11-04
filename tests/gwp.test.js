import { By, until } from 'selenium-webdriver';
import { createDriver } from './driverFactory.js';

// Run tests: 
// npm run test:headed -> Opens and shows browser window while testing
// npm run test -> Does everything "hidden"
// Run only this file: 
// npm run test -- tests/gwp.tests.js

describe('GWP Bulme', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test('Im Header ist GWP enthalten.', async () => {
    await driver.get('https://gwp.bulme.at/index.php?view=user');

    const title = await driver.findElement(By.css('header'));
    const title_text = await title.getText();
    expect(title_text).toContain('GWP');
  }, 30000);

  test('Seite ist über den Footer als BULME-Seite identifizierbar.', async () => {
    await driver.get('https://gwp.bulme.at/index.php?view=user');

    const footer = await driver.findElement(By.css('footer'));
    const footer_text = await footer.getText();

    expect(footer_text).toContain('BULME');
  }, 30000);

  test('Login and verification of site afterwards', async () => {
    await driver.get('https://gwp.bulme.at/');

    const username_input = await driver.findElement(By.id('box_username'));
    // set the login credentials as environment variables in the terminal
    // before Testing:
    // export STUDENT_USER='mymail@mal.com'
    // export STUDENT_PASS='your_password'
    // npm run test
    await username_input.sendKeys(process.env.STUDENT_USER);

    const password_input = await driver.findElement(By.id('box_password'));
    await password_input.sendKeys(process.env.STUDENT_PASS);

    const login_btn = await driver.findElement(By.css('.btn-primary'));
    await login_btn.click();

    // waits max 5sec until the login_btn disappears and continues with the test after it's gone
    await driver.wait(until.stalenessOf(login_btn), 5000);

    const schuljahr_label = await driver.findElement(By.css('label'));
    const schuljahr_label_text = await schuljahr_label.getText();

    expect(schuljahr_label_text).toContain('Schuljahr');
  }, 30000);
  
});