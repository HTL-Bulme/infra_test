import { Builder } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';

export async function createDriver() {
  let options = new firefox.Options();
  const isHeadless = process.env.HEADLESS !== 'false';

  if (isHeadless) {
    options.addArguments('-headless');
    options.addArguments('--width=1920');
    options.addArguments('--height=1080');
  }

  return new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
}