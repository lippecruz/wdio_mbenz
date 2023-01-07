import { Locator, Page } from '@playwright/test';

export class Filter {
  readonly page: Page;
  readonly fuelTypeContainer: Locator;
  readonly fuelTypeDiselOption: Locator;
  readonly fuelTypeIndicator: Locator;

  /* Important considerations:
  ** I was not able to find the elements using chrome or firefex consoles
  ** WebdriverIo also failed to find the elements in the page... Playwright was but only with this format
  ** Ideally the css localor would be so long and the some of the queries not done from the whole page
  */

  constructor(page: Page, context: Locator) {
    this.page = page;
    this.fuelTypeContainer = context.locator('cc-motorization-filters > cc-motorization-filters-form > form > div > div.cc-motorization-filters-form__primary > div.cc-motorization-filters-form__primary-filters.ng-star-inserted > cc-motorization-filters-primary-filters > div > fieldset > wb-multi-select-control');
    this.fuelTypeDiselOption = this.fuelTypeContainer.locator('div > div > wb-checkbox-control:nth-child(1) > label');
    this.fuelTypeIndicator = this.fuelTypeContainer.locator('button > wb-counter')
  }
}