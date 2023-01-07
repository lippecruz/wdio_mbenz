import { Locator, Page } from '@playwright/test';
import { CarList } from '../compoments/car.list.po';
import { Filter } from '../compoments/filter.po';

export class BuildCarPage {
  readonly page: Page;
  readonly mainContainer: Locator;
  readonly buildCarButton: Locator;
  // Filters Section
  readonly fuelFilter: Filter;
  // Cars List Section
  readonly carsList: CarList;

  /* Important considerations:
  ** I was not able to find the elements using chrome or firefex consoles
  ** WebdriverIo also failed to find the elements in the page... Playwright was but only with this format
  ** Ideally the css localor would be so long and the some of the queries not done from the whole page
  */

  constructor(page: Page) {
    this.page = page;
    this.buildCarButton = page.locator('div > div.owc-stage__content-wrapper > div > div.owc-stage__cta-wrapper.wb-grid-row > div > div > a.owc-stage-cta-buttons__button.wb-button.wb-button--medium.wb-button--theme-dark.wb-button--large.wb-button--secondary.owc-stage-cta-buttons__button--secondary');
    // Main Container
    this.mainContainer = page.locator('#cc-app-container-main > div.cc-app-container__main-frame.cc-grid-container > div.cc-grid-container.ng-star-inserted > div > div:nth-child(2) > cc-motorization');
    // Filters Section
    this.fuelFilter = new Filter(this.page, this.mainContainer);
    // Cars List Section
    this.carsList = new CarList(this.page, this.mainContainer);
  }
}