const { By, until } = require('selenium-webdriver');
const { createDriver } = require('./driverFactory');

const timeout = 30000;

const SEL = {
    user: By.id('rcmloginuser'),
    pass: By.id('rcmloginpwd'),
    submit: By.id('rcmloginsubmit'),
    loggedIn: By.css('a.logout, #layout'),
    };

    describe('schueler.bulme.at (Jest + Selenium + Firefox)', () => {
    let driver;

    beforeAll(async () => {
    driver = await createDriver();
    }, timeout);

    afterAll(async () => {
    if (driver) await driver.quit();
    });
    
    test('should load schueler.bulme.at', async () => {
        await driver.get('https://schueler.bulme.at/');
        expect(await driver.getTitle()).toBe('BULME Schuelerweb');
    }, timeout);

    test('should serve autotest.txt', async () => {
        await driver.get('https://schueler.bulme.at/~sg.test/autotest.txt');
        const text = await driver.findElement(By.css('pre')).getText();
        expect(text.trim()).toBe('PASSED');
    }, timeout);

});