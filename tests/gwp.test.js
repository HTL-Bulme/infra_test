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

  test('Seite hat einen Titel', async () => {
    await driver.get('https://gwp.bulme.at/index.php?view=user');

    const title = await driver.findElements(By.css('title'));
    expect(title.length).toBeGreaterThan(0);
  });
});