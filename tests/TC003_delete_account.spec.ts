import { test } from "../custom_fixture/salesforce.fixture";
import deleteAccountJSON from "../Data/delete_account_data.json";

for (const account of deleteAccountJSON) {
  test(`Delete account - ${account.accountName}`, async ({ accountsPage }) => {
    await accountsPage.loadURL();
    await accountsPage.clickAccountsModule();
    await accountsPage.clickNewAccount();
    await accountsPage.fillAccountForm(account);
    await accountsPage.clickSaveAccountBtn();
    await accountsPage.assertAccountCreation();
    await accountsPage.deleteCreatedAccount();
    await accountsPage.assertAccountDeleted();
  });
}
