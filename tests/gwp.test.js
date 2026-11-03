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
    await driver.get('https://gwp.bulme.at/index.php?view=user');

    const title = await driver.findElement(By.css('header'));
    const title_text = await title.getText(); 
    expect(title_text).toContain('GWP');
  });

  test('Seite ist über den Footer als BULME-Seite identifizierbar.', async () => {
    await driver.get('https://gwp.bulme.at/index.php?view=user');

    const footer = await driver.findElement(By.css('footer'));
    const footer_text = await footer.getText(); 

    expect(footer_text).toContain('BULME');
  })
});