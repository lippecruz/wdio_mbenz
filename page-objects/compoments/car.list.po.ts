import { Locator, Page } from '@playwright/test';

export class CarList {
  readonly page: Page;
  readonly list: Locator;

  /* Important considerations:
  ** I was not able to find the elements using chrome or firefex consoles
  ** WebdriverIo also failed to find the elements in the page... Playwright was but only with this format
  ** Ideally the css localor would be so long and the some of the queries not done from the whole page
  */

  constructor(page: Page, context: Locator) {
    this.page = page;
    this.list = context.locator('cc-motorization-comparison > div > div > div');
  }

  async getCarPrice(car: Locator) {
    let elementText = await car.locator('wb-card > div.cc-motorization-comparison-header-wrapper > cc-motorization-header > div > div > div.wb-type-copy-strong.cc-motorization-header__price.cc-text.ng-star-inserted').innerText();
    return Number(elementText.match(/\d/g)?.join(""));
  }
}