import { test } from "@playwright/test";
import { AccountsPageClass } from "../pages/AccountsPage";
import deleteAccountJSON from "../Data/delete_account_data.json";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

for (const account of deleteAccountJSON) {
  test(`Delete account - ${account.accountName}`, async ({ page }) => {
    const ap = new AccountsPageClass(page);
    await ap.loadURL();
    await ap.clickAccountsModule();
    await ap.clickNewAccount();
    await ap.fillAccountForm(account);
    await ap.clickSaveAccountBtn();
    await ap.assertAccountCreation();
    await ap.deleteCreatedAccount();
    await ap.assertAccountDeleted();
  });
}
