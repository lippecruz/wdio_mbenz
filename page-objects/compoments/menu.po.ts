import { Locator, Page } from '@playwright/test';

export class Menu {
  readonly page: Page;
  // "Our Cars" Section
  readonly ourCarsOption: Locator;
  readonly hatchbackOption: Locator;
  readonly hatchbackClassAOption: Locator;

  /* Important considerations:
  ** I was not able to find the elements using chrome or firefex consoles
  ** WebdriverIo also failed to find the elements in the page... Playwright was but only with this format
  ** Ideally the css localor would be so long and the some of the queries not done from the whole page
  */

  constructor(page: Page) {
    this.page = page;
    // "Our Cars" Section
    this.ourCarsOption = page.locator('header > div > nav.owc-header__header-navigation > div > ul > li.owc-header-navigation-topic.owc-header-navigation-topic--desktop-nav.owc-header-navigation-topic__model-flyout > button');
    this.hatchbackOption = page.locator('#app-vue > div > ul > li:nth-child(3) > ul > li:nth-child(4) > div');
    this.hatchbackClassAOption = page.locator('#app-vue > div > owc-header-flyout > ul > li > ul > li:nth-child(1)');
  }
}