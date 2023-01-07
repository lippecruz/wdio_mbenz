import { test, expect, type Page } from '@playwright/test';
import { LandingPage } from '../page-objects/pages/landing.page.po';
import { Menu } from '../page-objects/compoments/menu.po';
import { BuildCarPage } from '../page-objects/pages/build.car.page.po';
import fs from 'fs';

function createFile(fileName: string, value: string) {
  fs.writeFile(fileName, value, function (err: any) {
    // In case of a error throw err.
    if (err)
      throw err;
  });
};

test.describe('Given a user in the landing page', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);

    await landingPage.goto();
    await landingPage.agreeButton.click();
  });

  test.describe('When the user navigates to Hatchback Class A page', () => {
    test.beforeEach(async ({ page }) => {
      landingPage = new LandingPage(page);

      await landingPage.menu.ourCarsOption.click();
      await landingPage.menu.hatchbackOption.click();
      await landingPage.menu.hatchbackClassAOption.click();
    });

    test('should land in the hatchbacks page', async ({ page }) => {
      await expect(page).toHaveURL(/.*passengercars\/models\/hatchback\/w177\/overview.html/);
    });

    test.describe('and the user selects "Build Car"', () => {
      let buildCarPage: BuildCarPage;

      test.beforeEach(async ({ page }) => {
        buildCarPage = new BuildCarPage(page);
        await buildCarPage.buildCarButton.click();
      });

      test('should land in the car configurator page', async ({ page }) => {
        await expect(page).toHaveURL(/.*passengercars\/mercedes-benz-cars\/car-configurator.html/);
      });

      test('should display the "Fuel type" filter', async ({ page }) => {
          buildCarPage = new BuildCarPage(page);
          // await buildCarPage.fuelFilter.fuelTypeContainer.scrollIntoViewIfNeeded();
          await expect(buildCarPage.fuelFilter.fuelTypeContainer).toBeVisible();
      });

      test.describe('and the user selects the "Disel" option', () => {        
        test.beforeEach(async ({ page }) => {
          buildCarPage = new BuildCarPage(page);
          
          await buildCarPage.fuelFilter.fuelTypeContainer.click();
          await buildCarPage.fuelFilter.fuelTypeDiselOption.click();
        });
  
        test('should display a filetered cars list', async ({ page }) => {
          buildCarPage = new BuildCarPage(page);
          
          expect(await buildCarPage.fuelFilter.fuelTypeIndicator.textContent()).toBe("1");
          expect(await buildCarPage.carsList.list.count()).toBe(4);
        });

        test('should display the price for each car', async ({ page, browserName}) => {
          buildCarPage = new BuildCarPage(page);
          
          const carsList = buildCarPage.carsList.list;
          const carsListCount = await carsList.count();
          let prices = [];

          for (var index= 0; index < carsListCount ; index++) {
              const carPrice = await buildCarPage.carsList.getCarPrice(carsList.nth(index));
              expect(carPrice).not.toBeUndefined();
              prices.push(carPrice);
          }

          // Save Car Prices to text file
          const max = Math.max(...prices);
          const min = Math.min(...prices);
          createFile(`./test-files/car-prices-${browserName}.txt`, 'MAX:' + max + ' | MIN:' + min);

          // Save page screenshot
          await page.screenshot({ path: `./screenshots/car-prices-${browserName}.png`, fullPage: true });
        });
      });
    });
  });
});