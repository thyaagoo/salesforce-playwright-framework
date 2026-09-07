import { test } from "../custom_fixture/salesforce.fixture";
import { generateRandomPhone, generateRandomWebsite } from "../Utils/randomGenerators";

test("Modify account - POM flow with randomized data", async ({ accountsPage }) => {
  await accountsPage.loadURL();
  await accountsPage.clickAccountsModule();
  await accountsPage.clickFirstRow();
  await accountsPage.updatePhoneAndWebsite(generateRandomPhone(), generateRandomWebsite());
  await accountsPage.clickSaveAccountBtn();
  await accountsPage.assertAccountUpdated();
});