import { Locator, Page } from '@playwright/test';
import { Menu } from '../compoments/menu.po';

require('dotenv').config({ path: '.env' })

export class LandingPage {
  readonly page: Page;
  // "Accept Terms" Section
  readonly agreeButton: Locator;
  // Menu Section
  readonly menu: Menu;

  /* Important considerations:
  ** I was not able to find the elements using chrome or firefex consoles
  ** WebdriverIo also failed to find the elements in the page... Playwright was but only with this format
  ** Ideally the css localor would be so long and the some of the queries not done from the whole page
  */

  constructor(page: Page) {
    this.page = page;
    // "Accept Terms" Section
    this.agreeButton = page.locator('div > div > div.cmm-cookie-banner__content > cmm-buttons-wrapper > div > div > button.wb-button.wb-button--primary.wb-button--small.wb-button--accept-all');
    // Menu Section
    this.menu = new Menu(this.page);
  }

  async goto() {
    await this.page.goto(`${process.env.LAUNCH_URL}/`);
  }
}