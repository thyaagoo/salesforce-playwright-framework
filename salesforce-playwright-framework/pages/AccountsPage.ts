import { HomePage } from "./HomePage"
import { expect } from "@playwright/test";

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

export class AccountsPage extends HomePage {

  async fillAccountForm(account: AccountData) {
    await this.Gpage.locator('input[class="slds-input"][name="Name"][part="input"]').fill(account.accountName);
    await this.Gpage.locator('input[name="AccountNumber"][class="slds-input"][part="input"]').fill(account.accountNumber);
    await this.Gpage.locator('input[name="Site"][class="slds-input"][type="text"]').fill(account.site);
    await this.Gpage.locator('button[data-value="--None--"][aria-label="Type"][type="button"]').click();
    await this.Gpage.locator(`//div[@aria-label='Type']/lightning-base-combobox-item[${account.typeIndex}]`).click();
    await this.Gpage.locator('input[name="AnnualRevenue"][inputmode="decimal"]').fill(account.annualRevenue);
    await this.Gpage.locator('button[aria-label="Rating"][role="combobox"]').click();
    await this.Gpage.locator(`//div[@aria-label='Rating']/lightning-base-combobox-item[${account.ratingIndex}]`).click();
    await this.Gpage.locator('input[name="Phone"][type="text"][class="slds-input"]').fill(account.phone);
    await this.Gpage.locator("input[name='Fax'][type='text'][class='slds-input']").fill(account.fax);
    await this.Gpage.locator('input[name="Website"][type="text"][class="slds-input"]').fill(account.website);
    await this.Gpage.locator('input[name="TickerSymbol"][type="text"][class="slds-input"]').fill(account.tickerSymbol);
    await this.Gpage.locator('button[aria-label="Ownership"][role="combobox"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label="Ownership"]/lightning-base-combobox-item[${account.ownershipIndex}]`).click();
    await this.Gpage.getByRole("spinbutton", { name: "Employees" }).fill(account.employees);
    await this.Gpage.getByText("SIC Code").fill(account.sicCode);
    await this.Gpage.locator('input[aria-label="Billing Country"][data-value="--None--"][autocomplete="country"]').click();
    await this.Gpage.locator(`//div[@aria-label="Billing Country"]/lightning-base-combobox-item[${account.billingCountryIndex}]`).click();
    await this.Gpage.locator('textarea[name="street"][autocomplete="street-address"]').nth(0).fill(account.billingStreet);
    await this.Gpage.locator('//label[text()="Billing City"]/following-sibling::div/input[@name="city" and @autocomplete="address-level2"]').fill(account.billingCity);
    await this.Gpage.locator('//label[text()="Billing Zip/Postal Code"]/following-sibling::div/input[@name="postalCode" and @autocomplete="postal-code"]').fill(account.billingZip);
    await this.Gpage.locator('input[aria-label="Shipping Country"][data-value="--None--"][role="combobox"]').click();
    await this.Gpage.locator(`//div[@aria-label="Shipping Country"]/lightning-base-combobox-item[${account.shippingCountryIndex}]`).click();
    await this.Gpage.locator('textarea[name="street"][autocomplete="street-address"]').nth(1).fill(account.shippingStreet);
    await this.Gpage.locator('//label[text()="Shipping City"]/following-sibling::div/input[@name="city" and @autocomplete="address-level2"]').fill(account.shippingCity);
    await this.Gpage.locator('//label[text()="Shipping Zip/Postal Code"]/following-sibling::div/input[@name="postalCode" and @autocomplete="postal-code"]').fill(account.shippingZip);
    await this.Gpage.locator('//label[text()="Shipping Zip/Postal Code"]/following-sibling::div/input[@name="postalCode" and @autocomplete="postal-code"]').blur();
    await this.Gpage.locator('button[aria-label="Customer Priority"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label="Customer Priority"]/lightning-base-combobox-item[${account.customerPriorityIndex}]`).click();
    await this.Gpage.locator('input[name="SLAExpirationDate__c"]').fill(account.slaExpirationDate);
    await this.Gpage.locator('input[name="NumberofLocations__c"][inputmode="decimal"][type="text"]').fill(account.numberOfLocations);
    await this.Gpage.locator('button[aria-label="Active"][data-value="--None--"][role="combobox"]').click();
    await this.Gpage.locator(`//div[@aria-label="Active"]/lightning-base-combobox-item[${account.activeIndex}]`).click();
    await this.Gpage.locator('button[aria-label="SLA"][data-value="--None--"][role="combobox"]').click();
    await this.Gpage.locator(`//div[@aria-label="SLA"]/lightning-base-combobox-item[${account.slaIndex}]`).click();
    await this.Gpage.locator('input[name="SLASerialNumber__c"][type="text"][maxlength="10"]').fill(account.slaSerialNumber);
    await this.Gpage.locator('button[aria-label="Upsell Opportunity"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label="Upsell Opportunity"]/lightning-base-combobox-item[${account.upsellIndex}]`).click();
    await this.Gpage.locator('textarea[part="textarea"][maxlength="32000"]').fill(account.description);
  }

  async clickSaveAccountBtn() {
    await this.Gpage.locator('button[name="SaveEdit"][type="button"]').click();
  }

  async assertAccountCreation(){
    await expect(this.Gpage.getByText("was created", {exact: false})).toBeVisible()
  }

  //File upload methods
    async uploadFile(filePath: string) {
    const fileElement = this.Gpage.locator('input[type="file"]').first();
    await fileElement.setInputFiles(filePath);
  }

  async clickUploadDoneButton() {
    const doneButton = this.Gpage.locator(
      "//button[contains(@class,'desktop uiButton--default')]/span[text()='Done']"
    );
    await expect(doneButton).toBeEnabled();
    await doneButton.click();
  }

  async assertFileUploaded() {
    await expect(this.Gpage.getByText("was uploaded", { exact: false })).toBeVisible();
  }

  //Below 3 methods are specific to Modify account scenario
  async clickFirstRow() {
    await this.Gpage.locator("//tbody[contains(@style,'counter-reset: row-number 0')]/tr[1]/td[6]").click();
    await this.Gpage.locator("//ul[@class='scrollable' and @role='presentation']/li[1]").click();
  }

  async updatePhoneAndWebsite(phone: string, website: string) {
    await this.Gpage.locator('input[name="Phone"][type="text"][class="slds-input"]').fill(phone);
    await this.Gpage.locator('input[name="Website"][type="text"][class="slds-input"]').fill(website);
  }

  async assertAccountUpdated() {
    await expect(this.Gpage.getByText("was saved", { exact: false })).toBeVisible();
  }

  //Below methods are specific to Delete account scenario
  async deleteCreatedAccount() {
    await this.Gpage.locator("//span[text()='Show more actions']").click();
    await this.Gpage.locator('runtime_platform_actions-action-renderer[title="Delete"][apiname="Delete"]').click();
    await this.Gpage.locator("//div[contains(@class,'forceModalActionContainer--footerAction')]/button[@title='Delete']").click();
  }

  async assertAccountDeleted() {
    await expect(this.Gpage.getByText("was deleted", { exact: false })).toBeVisible();
  }

  //Below methods are for negative test case scenario
  async assertRequiredFieldError() {
    const text = await this.Gpage.locator("//*[normalize-space(text())='Complete this field.']").textContent();
    expect(text).toBe("Account NameComplete this field.");

    const isErrorIconVisible = await this.Gpage.locator('lightning-primitive-icon[variant="error"][exportparts="icon"]').isVisible();
    expect(isErrorIconVisible).toBeTruthy();

    console.log(isErrorIconVisible? "Record not created. Account number field is empty. Test is passed": "Record is created. Test failed");
}
}
