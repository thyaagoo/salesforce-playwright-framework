import { test } from "@playwright/test";
import { AccountsPageClass } from "../pages/AccountsPage";
import accountsJSONInput from "../Data/create_account_data.json";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

for (const account of accountsJSONInput) {
  test(`Create new account - ${account.accountName}`, async ({ page }) => {
    const ap = new AccountsPageClass(page);
    await ap.loadURL();
    await ap.clickAccountsModule();
    await ap.clickNewAccount();
    await ap.fillAccountForm(account);
    await ap.clickSaveAccountBtn();
    await ap.assertAccountCreation();
    
    // File upload steps
    await ap.uploadFile("Data/samplefile.txt");
    await ap.clickUploadDoneButton();
    await ap.assertFileUploaded();
  });
}
