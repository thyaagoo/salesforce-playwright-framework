import { test } from "@playwright/test";
import { AccountsPage } from "../pages/AccountsPage";
import { generateRandomPhone, generateRandomWebsite } from "../Utils/randomGenerators";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

test("Modify account - POM flow with randomized data", async ({ page }) => {
  const map = new AccountsPage(page);
  await map.loadURL();
  await map.clickAccountsModule();
  await map.clickFirstRow();
  await map.updatePhoneAndWebsite(generateRandomPhone(), generateRandomWebsite());
  await map.clickSaveAccountBtn();
  await map.assertAccountUpdated();
});