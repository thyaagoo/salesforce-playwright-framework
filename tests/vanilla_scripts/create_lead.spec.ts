import { test,expect } from "@playwright/test";
import createLeadData from "../../Data/create_lead_data.json";

const lead = createLeadData[0];

test.use({
  storageState: "Data/SalesforceLogin.json",
});

test("Create new Lead - " + lead.lastName, async ({ page }) => {
  await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home");

  // Leads
  await page.locator("//a[@title='Leads']/span[text()='Leads']").click();
  // New Lead
  await page.locator("//lightning-button[@class='middleButton']/button[@name='New']").click();

  // Salutation dropdown (7 options)
  await page.locator('button[aria-label="Salutation"][data-value="--None--"]').click();
  await page.locator(`(//div[@aria-label='Salutation']/lightning-base-combobox-item)[${lead.salutationIndex}]`).click();

  // First name
  await page.locator('input[name="firstName"][placeholder="First Name"]').fill(lead.firstName);

  // Last name* MANDATORY FIELD
  await page.locator('input[name="lastName"][placeholder="Last Name"]').fill(lead.lastName);

  // Company* MANDATORY FIELD
  await page.locator('input[name="Company"][part="input"]').fill(lead.company);

  // Title
  await page.locator('input[name="Title"][part="input"]').fill(lead.title);

  // Lead Source dropdown (6 items)
  await page.locator('button[aria-label="Lead Source"][data-value="--None--"]').click();
  await page.locator(`//div[@aria-label='Lead Source']/lightning-base-combobox-item[${lead.leadSourceIndex}]`).click();

  // Industry dropdown (33 items)
  await page.locator('button[aria-label="Industry"][data-value="--None--"]').click();
  await page.locator(`//div[@aria-label='Industry']/lightning-base-combobox-item[${lead.industryIndex}]`).click();

  // Annual Revenue
  await page.locator('input[name="AnnualRevenue"][type="text"][class="slds-input"]').fill(lead.annualRevenue);

  // Phone
  await page.locator('input[name="Phone"][type="text"][class="slds-input"]').fill(lead.phone);

  // Mobile
  await page.locator('input[name="MobilePhone"][type="text"][class="slds-input"]').fill(lead.mobilePhone);

  // Fax
  await page.locator('input[name="Fax"][type="text"][class="slds-input"]').fill(lead.fax);

  // Email
  await page.locator('input[name="Email"][type="text"][class="slds-input"]').fill(lead.email);

  // Website
  await page.locator('input[name="Website"][type="text"][class="slds-input"]').fill(lead.website);

  // Lead Status dropdown (5 items)
  await page.locator("//label[text()='Lead Status']").click();
  await page.locator(`//div[@aria-label='Lead Status']/lightning-base-combobox-item[${lead.leadStatusIndex}]`).click();

  // Rating dropdown (4 items)
  await page.locator('button[aria-label="Rating"][data-value="--None--"]').click();
  await page.locator(`//div[@aria-label='Rating']/lightning-base-combobox-item[${lead.ratingIndex}]`).click();

  // No. of employees
  await page.getByRole("spinbutton", { name: "No. of Employees", exact: true }).fill(lead.employees);

  // Country dropdown (236 items)
  await page.locator('input[aria-label="Country"][data-value="--None--"]').click();
  await page.locator(`//div[@aria-label='Country']/lightning-base-combobox-item[${lead.countryIndex}]`).click();

  // Street
  await page.getByRole("textbox", { name: "Street", exact: true }).fill(lead.street);

  // City
  await page.getByRole("textbox", { name: "City", exact: true }).fill(lead.city);

  // Zip/Post code
  await page.getByRole("textbox", { name: "Zip/Postal Code", exact: true }).fill(lead.zipCode);

  // Product interest dropdown (4 items)
  await page.locator('button[aria-label="Product Interest"][data-value="--None--"]').click();
  await page.locator(`//div[@aria-label='Product Interest']/lightning-base-combobox-item[${lead.productInterestIndex}]`).click();

  // SIC code
  await page.getByRole("textbox", { name: "SIC Code", exact: true }).fill(lead.sicCode);

  // Number of locations
  await page.getByRole("spinbutton", { name: "Number of Locations", exact: true }).fill(lead.numberOfLocations);

  // Current Generators(s)
  await page.getByRole("textbox", { name: "Current Generator(s)", exact: true }).fill(lead.currentGenerators);

  // Primary dropdown (3 items)
  await page.locator('button[aria-label="Primary"][data-value="--None--"]').click();
  await page.locator(`//div[@aria-label='Primary']/lightning-base-combobox-item[${lead.primaryIndex}]`).click();

  // Description
  await page.locator('textarea[part="textarea"][maxlength="32000"]').fill(lead.description);

  // Save button
  await page.locator('button[name="SaveEdit"][type="button"]').click();

  //Leads creation assertion
  await expect(page.getByText("was created", { exact: false })).toBeVisible();
});