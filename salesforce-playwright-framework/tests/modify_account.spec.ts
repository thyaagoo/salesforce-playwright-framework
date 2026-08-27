import { test, expect } from "@playwright/test";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

test("Modify account - minimal vanilla flow", async ({ page }) => {
  const updatedPhone = "7093024";
  const updatedWebsite = "https://moodified-account_tc02.com";

  await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home");
  await page.locator("//a[@title='Accounts']/span[text()='Accounts']").click();

  //Click first row element
  await page.locator("//tbody[contains(@style,'counter-reset: row-number 0')]/tr[1]/td[6]").click()
  await page.locator("//ul[@class='scrollable' and @role='presentation']/li[1]").click()
  await page.locator('input[name="Phone"][type="text"][class="slds-input"]').fill(updatedPhone)
  await page.locator('input[name="Website"][type="text"][class="slds-input"]').fill(updatedWebsite)
  await page.locator('button[name="SaveEdit"][type="button"]').click()
  await expect(page.getByText("was saved", { exact: false })).toBeVisible()

});
