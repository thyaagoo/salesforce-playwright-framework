import { expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export type LeadData = {
  salutationIndex: number;
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  leadSourceIndex: number;
  industryIndex: number;
  annualRevenue: string;
  phone: string;
  mobilePhone: string;
  fax: string;
  email: string;
  website: string;
  leadStatusIndex: number;
  ratingIndex: number;
  employees: string;
  countryIndex: number;
  street: string;
  city: string;
  zipCode: string;
  productInterestIndex: number;
  sicCode: string;
  numberOfLocations: string;
  currentGenerators: string;
  primaryIndex: number;
  description: string;
};

export class LeadsPage extends HomePage {
  async clickNewLead() {
    await this.Gpage.locator("//lightning-button[@class='middleButton']/button[@name='New']").click();
  }

  async fillLeadForm(lead: LeadData) {
    await this.Gpage.locator('button[aria-label="Salutation"][data-value="--None--"]').click();
    await this.Gpage.locator(`(//div[@aria-label='Salutation']/lightning-base-combobox-item)[${lead.salutationIndex}]`).click();

    await this.Gpage.locator('input[name="firstName"][placeholder="First Name"]').fill(lead.firstName);
    await this.Gpage.locator('input[name="lastName"][placeholder="Last Name"]').fill(lead.lastName);
    await this.Gpage.locator('input[name="Company"][part="input"]').fill(lead.company);
    await this.Gpage.locator('input[name="Title"][part="input"]').fill(lead.title);

    await this.Gpage.locator('button[aria-label="Lead Source"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label='Lead Source']/lightning-base-combobox-item[${lead.leadSourceIndex}]`).click();

    await this.Gpage.locator('button[aria-label="Industry"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label='Industry']/lightning-base-combobox-item[${lead.industryIndex}]`).click();

    await this.Gpage.locator('input[name="AnnualRevenue"][type="text"][class="slds-input"]').fill(lead.annualRevenue);
    await this.Gpage.locator('input[name="Phone"][type="text"][class="slds-input"]').fill(lead.phone);
    await this.Gpage.locator('input[name="MobilePhone"][type="text"][class="slds-input"]').fill(lead.mobilePhone);
    await this.Gpage.locator('input[name="Fax"][type="text"][class="slds-input"]').fill(lead.fax);
    await this.Gpage.locator('input[name="Email"][type="text"][class="slds-input"]').fill(lead.email);
    await this.Gpage.locator('input[name="Website"][type="text"][class="slds-input"]').fill(lead.website);

    await this.Gpage.locator("//label[text()='Lead Status']").click();
    await this.Gpage.locator(`//div[@aria-label='Lead Status']/lightning-base-combobox-item[${lead.leadStatusIndex}]`).click();

    await this.Gpage.locator('button[aria-label="Rating"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label='Rating']/lightning-base-combobox-item[${lead.ratingIndex}]`).click();

    await this.Gpage.getByRole("spinbutton", { name: "No. of Employees", exact: true }).fill(lead.employees);

    await this.Gpage.locator('input[aria-label="Country"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label='Country']/lightning-base-combobox-item[${lead.countryIndex}]`).click();

    await this.Gpage.getByRole("textbox", { name: "Street", exact: true }).fill(lead.street);
    await this.Gpage.getByRole("textbox", { name: "City", exact: true }).fill(lead.city);
    await this.Gpage.getByRole("textbox", { name: "Zip/Postal Code", exact: true }).fill(lead.zipCode);

    await this.Gpage.locator('button[aria-label="Product Interest"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label='Product Interest']/lightning-base-combobox-item[${lead.productInterestIndex}]`).click();

    await this.Gpage.getByRole("textbox", { name: "SIC Code", exact: true }).fill(lead.sicCode);
    await this.Gpage.getByRole("spinbutton", { name: "Number of Locations", exact: true }).fill(lead.numberOfLocations);
    await this.Gpage.getByRole("textbox", { name: "Current Generator(s)", exact: true }).fill(lead.currentGenerators);

    await this.Gpage.locator('button[aria-label="Primary"][data-value="--None--"]').click();
    await this.Gpage.locator(`//div[@aria-label='Primary']/lightning-base-combobox-item[${lead.primaryIndex}]`).click();

    await this.Gpage.locator('textarea[part="textarea"][maxlength="32000"]').fill(lead.description);
  }

  async clickSaveLead() {
    await this.Gpage.locator('button[name="SaveEdit"][type="button"]').click();
  }

  async assertLeadCreated() {
    await expect(this.Gpage.getByText("was created", { exact: false })).toBeVisible();
  }

  // Below methods are specific to Delete account scenario
  async deleteLead() {
    await this.Gpage.locator("//span[text()='Show more actions']").click();
    await this.Gpage.locator('runtime_platform_actions-action-renderer[title="Delete"][apiname="Delete"]').click();
    await this.Gpage.locator("//div[contains(@class,'forceModalActionContainer--footerAction')]/button[@title='Delete']").click();
  }

  async assertLeadDeleted() {
    await expect(this.Gpage.getByText("was deleted", { exact: false })).toBeVisible();
  }
}
