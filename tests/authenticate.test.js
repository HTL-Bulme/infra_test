const {By, Builder, until, Key} = require('selenium-webdriver');
const assert = require("assert");
const { createDriver } = require('./driverFactory.js');
const studentUser = process.env.STUDENT_USER;
const studentPass = process.env.STUDENT_PASS;

// Setzt das Timeout für alle Tests in dieser Datei auf 30 Sekunden
jest.setTimeout(30000); 

describe('First script', function () {
  let driver;

  beforeAll(async function () {
    driver = await new Builder().forBrowser('firefox').build();
  });

  it('should lead to the Microsoft login page', async function () {
    await driver.get('https://wiki.bulme.at');

    let title = await driver.getTitle();
    assert.equal("Outline", title);

    await driver.manage().setTimeouts({implicit: 10000});

    const microsoftButton = await driver.wait(
      until.elementLocated(
        By.xpath("//*[contains(text(), 'Weiter mit Microsoft')]")
      ),
      30000
    );

    microsoftButton.click()

    await until.urlContains("https://login.microsoftonline.com");
  });

  it('should login with given credentials', async function () {

    let inputBox = await driver.findElement(By.id('i0116'));
    await inputBox.sendKeys(studentUser);
    //await driver.manage().setTimeouts({implicit: 10000});

    let nextButton = await driver.findElement(By.id('idSIButton9'));
    await nextButton.click();
    await driver.manage().setTimeouts({implicit: 10000});

    await driver.sleep(2000);

    let passwordBox = await driver.findElement(By.id('i0118'));
    await driver.wait(until.elementIsVisible(passwordBox), 10000);
    await passwordBox.sendKeys(studentPass, Key.ENTER);

});


  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });
});
