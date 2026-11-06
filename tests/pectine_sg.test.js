const { createDriver } = require('./driverFactory.js');
const { By, until } = require('selenium-webdriver');

// Set timeout for all tests to 30 seconds
jest.setTimeout(30000);

describe("Pectine autotest", () => {
  let driver;

  beforeAll(async() => {
    driver = await createDriver();
  })

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("try get url and proof autotest passed", async () => {
    await driver.get('https://pectine.bulme.at/~sg/autotest.txt');

    await driver.wait(
      until.elementLocated(By.xpath('//*[contains(text(), "PASSED")]')), 10000);
  });
}
)
