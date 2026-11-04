import { By } from 'selenium-webdriver';
import { createDriver } from './driverFactory.js';

describe('GWP Bulme', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test('Im Header ist GWP enthalten.', async () => {
    await driver.get('https://tools.bulme.at/');

    const title = await driver.findElement(By.css('header'));
    const title_text = await title.getText(); 
    expect(title_text).toContain('GWP');
  });

});