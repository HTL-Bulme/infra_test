import { By, until } from 'selenium-webdriver';
import { createDriver } from './driverFactory.js';

describe('GWP Bulme', () => {
  let driver;

  beforeAll(async () => {
    driver = await createDriver();
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test('Website lädt und ist als BULME Seite identifizierbar.', async () => {
    await driver.get('https://tools.bulme.at/');

    const title = await driver.getTitle();
    expect(title).toContain('BULME');
  });

  test('Die Seite lädt Informationen zu Schnuppertagen.', async () => {
    await driver.get('https://tools.bulme.at/');

    const header_elem = await driver.findElement(By.css('h2')); 
    const header_text = await header_elem.getText(); 

    expect(header_text).toContain('Schnuppertage');
  });

  test('Anmelde Button funktoniert und leitet weiter', async () => {
    await driver.get('https://tools.bulme.at/');

    const btn = await driver.findElement(By.css('.btn-ok')); 
    await btn.click();

    await driver.wait(until.stalenessOf(btn), 5000);

    const header_elem = await driver.findElement(By.css('label[for="slot"]'));
    const header_text = await header_elem.getText();

    expect(header_text).toContain('Wunschtermin');
  });

});