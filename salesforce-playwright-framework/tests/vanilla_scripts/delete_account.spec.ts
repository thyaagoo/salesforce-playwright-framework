import { test, expect } from "@playwright/test";

test.use({
      storageState: "Data/SalesforceLogin.json"
})

test("Delete account - minimal vanilla flow", async ({ page }) => {
  const uniqueSuffix = Date.now();
  const accountName = `Delete account ${uniqueSuffix}`;

  await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home");

  // Open Accounts and create a simple account so this test is self-contained.
  await page.locator("//a[@title='Accounts']/span[text()='Accounts']").click();
  await page.locator("//a[@title='New']/div[@title='New']").click();
  await page.locator('input[class="slds-input"][name="Name"][part="input"]').fill(accountName);
  await page.locator("//button[@name='SaveEdit'] | //button[@name='Save']").first().click();

  await expect(page.getByRole("heading", { name: accountName })).toBeVisible();
  //Click 'show more actions button'
  await page.locator("//span[text()='Show more actions']").click()
  //Click Delete option
  await page.locator('runtime_platform_actions-action-renderer[title="Delete"][apiname="Delete"]').click()
  await page.locator("//div[contains(@class,'forceModalActionContainer--footerAction')]/button[@title='Delete']").click()
  // Basic verification with toast text
  await expect(page.getByText("was deleted", {exact: false})).toBeVisible()

});
