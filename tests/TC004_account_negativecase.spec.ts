import { test } from "../custom_fixture/salesforce.fixture";
import { generateRandomPhone, generateRandomWebsite } from "../Utils/randomGenerators";

test('Accounts - negative test case', async ({ accountsPage }) => {
  await accountsPage.loadURL();
  await accountsPage.clickAccountsModule();
  await accountsPage.clickNewAccount();
  await accountsPage.updatePhoneAndWebsite(generateRandomPhone(), generateRandomWebsite());
  await accountsPage.clickSaveAccountBtn();
  await accountsPage.assertRequiredFieldError();
});