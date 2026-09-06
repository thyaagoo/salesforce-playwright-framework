import { test } from "@playwright/test";
import { AccountsPage } from "../pages/AccountsPage";
import { generateRandomPhone, generateRandomWebsite } from "../Utils/randomGenerators";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

test ('Accounts - negative test case', async ({page}) => {
    const accNeg = new AccountsPage(page)
    await accNeg.loadURL();
    await accNeg.clickAccountsModule();
    await accNeg.clickNewAccount();
    await accNeg.updatePhoneAndWebsite(generateRandomPhone(), generateRandomWebsite());
    await accNeg.clickSaveAccountBtn();
    await accNeg.assertRequiredFieldError();
})