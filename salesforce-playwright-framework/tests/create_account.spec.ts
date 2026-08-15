import { test } from "@playwright/test";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

test('Create new account', async ({page}) => {
    await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home")
    await page.locator("//a[@title='Accounts']/span[text()='Accounts']").click()
    await page.locator("//a[@title='New']/div[@title='New']").click()
    await page.waitForTimeout(2000)
})
