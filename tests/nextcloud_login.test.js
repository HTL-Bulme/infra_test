const { By, until } = require('selenium-webdriver');
const { createDriver } = require('./driverFactory');

// Set timeout for all tests to 30 seconds
jest.setTimeout(30000);

describe ('Nextcloud login', () => {
    let driver;

    beforeEach(async () => {
        driver = await createDriver();
    });

    afterEach(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('login test', async () => {
        await driver.get("https://nextcloud.bulme.at/index.php/login?clear=1");

        let username = await driver.wait(until.elementLocated(By.id('user')));
        await username.sendKeys('$STUDENT_USER'); // $STUDENT_USER

        let password = await driver.wait(until.elementLocated(By.id('password')));
        await password.sendKeys('$STUDENT_PASS'); // $STUDENT_PASS

        let submit = await driver.wait(until.elementLocated(By.id('submit-form')));
        await submit.submit();

        await driver.wait(until.urlContains('/apps'), 6000);
        console.log('Login was successfull.');
    
    });
});
