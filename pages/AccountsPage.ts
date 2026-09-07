import { HomePage } from "./HomePage"
import { expect } from "@playwright/test";
import { selectors } from "./selectors";

type AccountData = {
  accountName: string;
  accountNumber: string;
  site: string;
  typeIndex: number;
  annualRevenue: string;
  ratingIndex: number;
  phone: string;
  fax: string;
  website: string;
  tickerSymbol: string;
  ownershipIndex: number;
  employees: string;
  sicCode: string;
  billingCountryIndex: number;
  billingStreet: string;
  billingCity: string;
  billingZip: string;
  shippingCountryIndex: number;
  shippingStreet: string;
  shippingCity: string;
  shippingZip: string;
  customerPriorityIndex: number;
  slaExpirationDate: string;
  numberOfLocations: string;
  activeIndex: number;
  slaIndex: number;
  slaSerialNumber: string;
  upsellIndex: number;
  description: string;
};

export class AccountsPageClass extends HomePage {

  async fillAccountForm(account: AccountData) {
    await this.Gpage.locator(selectors.accounts.accountNameInput).fill(account.accountName);
    await this.Gpage.locator(selectors.accounts.accountNumberInput).fill(account.accountNumber);
    await this.Gpage.locator(selectors.accounts.siteInput).fill(account.site);
    await this.Gpage.locator(selectors.accounts.typeDDBtn).click();
    await this.Gpage.locator(selectors.accounts.typeDDItem(account.typeIndex)).click();
    await this.Gpage.locator(selectors.accounts.annualRevenueInput).fill(account.annualRevenue);
    await this.Gpage.locator(selectors.accounts.ratingDDBtn).click();
    await this.Gpage.locator(selectors.accounts.ratingDDItem(account.ratingIndex)).click();
    await this.Gpage.locator(selectors.accounts.phoneInput).fill(account.phone);
    await this.Gpage.locator(selectors.accounts.faxInput).fill(account.fax);
    await this.Gpage.locator(selectors.accounts.websiteInput).fill(account.website);
    await this.Gpage.locator(selectors.accounts.tickerSymbolInput).fill(account.tickerSymbol);
    await this.Gpage.locator(selectors.accounts.ownershipDDBtn).click();
    await this.Gpage.locator(selectors.accounts.ownershipDDItem(account.ownershipIndex)).click();
    await this.Gpage.getByRole(selectors.accounts.employeesInputRole.role, { name: selectors.accounts.employeesInputRole.name }).fill(account.employees);
    await this.Gpage.getByText(selectors.accounts.sicCodeLabelText).fill(account.sicCode);
    await this.Gpage.locator(selectors.accounts.billingCountryDDBtn).click();
    await this.Gpage.locator(selectors.accounts.billingCountryDDItem(account.billingCountryIndex)).click();
    await this.Gpage.locator(selectors.accounts.streetInput).nth(0).fill(account.billingStreet);
    await this.Gpage.locator(selectors.accounts.billingCityInput).fill(account.billingCity);
    await this.Gpage.locator(selectors.accounts.billingZipInput).fill(account.billingZip);
    await this.Gpage.locator(selectors.accounts.shippingCountryDDBtn).click();
    await this.Gpage.locator(selectors.accounts.shippingCountryDDItem(account.shippingCountryIndex)).click();
    await this.Gpage.locator(selectors.accounts.streetInput).nth(1).fill(account.shippingStreet);
    await this.Gpage.locator(selectors.accounts.shippingCityInput).fill(account.shippingCity);
    await this.Gpage.locator(selectors.accounts.shippingZipInput).fill(account.shippingZip);
    await this.Gpage.locator(selectors.accounts.shippingZipInput).blur();
    await this.Gpage.locator(selectors.accounts.customerPriorityDDBtn).click();
    await this.Gpage.locator(selectors.accounts.customerPriorityDDItem(account.customerPriorityIndex)).click();
    await this.Gpage.locator(selectors.accounts.slaExpirationDateInput).fill(account.slaExpirationDate);
    await this.Gpage.locator(selectors.accounts.numberOfLocationsInput).fill(account.numberOfLocations);
    await this.Gpage.locator(selectors.accounts.activeDDBtn).click();
    await this.Gpage.locator(selectors.accounts.activeDDItem(account.activeIndex)).click();
    await this.Gpage.locator(selectors.accounts.slaDDBtn).click();
    await this.Gpage.locator(selectors.accounts.slaDDItem(account.slaIndex)).click();
    await this.Gpage.locator(selectors.accounts.slaSerialNumberInput).fill(account.slaSerialNumber);
    await this.Gpage.locator(selectors.accounts.upsellDDBtn).click();
    await this.Gpage.locator(selectors.accounts.upsellDDItem(account.upsellIndex)).click();
    await this.Gpage.locator(selectors.accounts.descriptionInput).fill(account.description);
  }

  async clickSaveAccountBtn() {
    await this.Gpage.locator(selectors.accounts.saveBtn).click();
  }

  async assertAccountCreation(){
    await expect(this.Gpage.getByText(selectors.accounts.createdToast, {exact: false})).toBeVisible()
  }

  //File upload methods
    async uploadFile(filePath: string) {
    const fileElement = this.Gpage.locator(selectors.accounts.fileInput).first();
    await fileElement.setInputFiles(filePath);
  }

  async clickUploadDoneButton() {
    const doneButton = this.Gpage.locator(selectors.accounts.uploadDoneBtn);
    await expect(doneButton).toBeEnabled();
    await doneButton.click();
  }

  async assertFileUploaded() {
    await expect(this.Gpage.getByText(selectors.accounts.uploadedToast, { exact: false })).toBeVisible();
  }

  //Below 3 methods are specific to Modify account scenario
  async clickFirstRow() {
    await this.Gpage.locator(selectors.accounts.firstRowCell).click();
    await this.Gpage.locator(selectors.accounts.firstRowMenuItem).click();
  }

  async updatePhoneAndWebsite(phone: string, website: string) {
    await this.Gpage.locator(selectors.accounts.phoneInput).fill(phone);
    await this.Gpage.locator(selectors.accounts.websiteInput).fill(website);
  }

  async assertAccountUpdated() {
    await expect(this.Gpage.getByText(selectors.accounts.savedToast, { exact: false })).toBeVisible();
  }

  //Below methods are specific to Delete account scenario
  async deleteCreatedAccount() {
    await this.Gpage.locator(selectors.accounts.showMoreActionsBtn).click();
    await this.Gpage.locator(selectors.accounts.deleteActionMenuItem).click();
    await this.Gpage.locator(selectors.accounts.deleteConfirmBtn).click();
  }

  async assertAccountDeleted() {
    await expect(this.Gpage.getByText(selectors.accounts.deletedToast, { exact: false })).toBeVisible();
  }

  //Below methods are for negative test case scenario
  async assertRequiredFieldError() {
    const text = await this.Gpage.locator(selectors.accounts.requiredFieldError).textContent();
    expect(text).toBe("Account NameComplete this field.");

    const isErrorIconVisible = await this.Gpage.locator(selectors.accounts.errorIcon).isVisible();
    expect(isErrorIconVisible).toBeTruthy();

    console.log(isErrorIconVisible? "Record not created. Account number field is empty. Test is passed": "Record is created. Test failed");
}
}
