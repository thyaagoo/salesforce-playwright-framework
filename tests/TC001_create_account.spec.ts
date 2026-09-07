import { test } from "../custom_fixture/salesforce.fixture";
import accountsJSONInput from "../Data/create_account_data.json";

for (const account of accountsJSONInput) {
  test(`Create new account - ${account.accountName}`, async ({ accountsPage }) => {
    await accountsPage.loadURL();
    await accountsPage.clickAccountsModule();
    await accountsPage.clickNewAccount();
    await accountsPage.fillAccountForm(account);
    await accountsPage.clickSaveAccountBtn();
    await accountsPage.assertAccountCreation();

    await accountsPage.uploadFile("Data/samplefile.txt");
    await accountsPage.clickUploadDoneButton();
    await accountsPage.assertFileUploaded();
  });
}
