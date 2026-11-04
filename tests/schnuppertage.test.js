import { By, until } from 'selenium-webdriver';
import { createDriver } from './driverFactory.js';

// Run tests: 
// npm run test:headed -> Opens and shows browser window while testing
// npm run test -> Does everything "hidden"
// Run only this file: 
// npm run test -- tests/schnuppertage.tests.js

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
  }, 30000);
  // the 30000 at the end gives the test 30secs to run/complete

  test('Die Seite lädt Informationen zu Schnuppertagen.', async () => {
    await driver.get('https://tools.bulme.at/');

    //the elements have no id or class, so the tests just use the first h2 element
    const header_elem = await driver.findElement(By.css('h2')); 
    const header_text = await header_elem.getText(); 

    expect(header_text).toContain('Schnuppertage');
  }, 30000);

  test('Anmelde Button funktoniert und leitet weiter', async () => {
    await driver.get('https://tools.bulme.at/');

    const btn = await driver.findElement(By.css('.btn-ok')); 
    await btn.click();

    await driver.wait(until.stalenessOf(btn), 5000);

    // searches for a label by it's for attribute
    const header_elem = await driver.findElement(By.css('label[for="slot"]'));
    const header_text = await header_elem.getText();

    expect(header_text).toContain('Wunschtermin');
  }, 30000);

});