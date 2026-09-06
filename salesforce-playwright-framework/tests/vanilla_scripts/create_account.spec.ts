import { test } from "@playwright/test";
import accountsInputData from "../../Data/accounts_data.json"

test.use({
  storageState: "Data/SalesforceLogin.json",
});

//Here, accountsInputData is an array and account refers to each array element inside the JSON file.
for (const account of accountsInputData){
  test(`Create new account - ${account.accountName}}`, async ({page}) => {
    await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home")
    //Accounts
    await page.locator("//a[@title='Accounts']/span[text()='Accounts']").click()
    //New Account
    await page.locator("//a[@title='New']/div[@title='New']").click()

    // ACCOUNT INFORMATION
    //Account name
    await page.locator('input[class="slds-input"][name="Name"][part="input"]').fill(account.accountName)
    //Account number
    await page.locator('input[name="AccountNumber"][class="slds-input"][part="input"]').fill(account.accountNumber)
    //Account Site
    await page.locator('input[name="Site"][class="slds-input"][type="text"]').fill(account.site)
    //Type (dropdown - 6 items)
    await page.locator('button[data-value="--None--"][aria-label="Type"][type="button"]').click()
    await page.locator(`//div[@aria-label='Type']/lightning-base-combobox-item[${account.typeIndex}]`).click()
    //Industry (dropdown - 33 items)
    /* await page.locator('button[aria-label="Industry"][type="button"][part="input-button"]').click()
    await page.locator('//div[@aria-label="Industry"]/lightning-base-combobox-item[20]').click() */
    //Annual revenue
    await page.locator('input[name="AnnualRevenue"][inputmode="decimal"]').fill(account.annualRevenue)
    //Rating
    await page.locator('button[aria-label="Rating"][role="combobox"]').click()
    await page.locator(`//div[@aria-label='Rating']/lightning-base-combobox-item[${account.ratingIndex}]`).click()
    //Phone
    await page.locator('input[name="Phone"][type="text"][class="slds-input"]').fill(account.phone)
    //Fax
    await page.locator("input[name='Fax'][type='text'][class='slds-input']").fill(account.fax)
    //Website
    await page.locator('input[name="Website"][type="text"][class="slds-input"]').fill(account.website)
    //Ticker Symbol
    await page.locator('input[name="TickerSymbol"][type="text"][class="slds-input"]').fill(account.tickerSymbol)
    //Ownership (5 options)
    await page.locator('button[aria-label="Ownership"][role="combobox"][data-value="--None--"]').click()
    await page.locator(`//div[@aria-label="Ownership"]/lightning-base-combobox-item[${account.ownershipIndex}]`).click()
    //Employees (no of employees)
    await page.getByRole("spinbutton",{name: 'Employees'}).fill(account.employees)
    //SIC code
    await page.getByText("SIC Code").fill(account.sicCode)

    // ADDRESS INFORMATION
    //Billing country (dropdown - 236 items)
    await page.locator('input[aria-label="Billing Country"][data-value="--None--"][autocomplete="country"]').click()
    await page.locator(`//div[@aria-label="Billing Country"]/lightning-base-combobox-item[${account.billingCountryIndex}]`).click()
    //Billing street
    await page.locator('textarea[name="street"][autocomplete="street-address"]').nth(0).fill(account.billingStreet)
    //Billing city
    await page.locator('//label[text()="Billing City"]/following-sibling::div/input[@name="city" and @autocomplete="address-level2"]').fill(account.billingCity)
    //Billing state/province: This dropdown is currently not filled as it depends on the country, shall be added later
    //Billing zip code/postal code
    await page.locator('//label[text()="Billing Zip/Postal Code"]/following-sibling::div/input[@name="postalCode" and @autocomplete="postal-code"]').fill(account.billingZip)
    //Shipping country (dropdown - 236 items)
    await page.locator('input[aria-label="Shipping Country"][data-value="--None--"][role="combobox"]').click()
    await page.locator(`//div[@aria-label="Shipping Country"]/lightning-base-combobox-item[${account.shippingCountryIndex}]`).click()
    //Shipping street
    await page.locator('textarea[name="street"][autocomplete="street-address"]').nth(1).fill(account.shippingStreet)
    //Shipping city
    await page.locator('//label[text()="Shipping City"]/following-sibling::div/input[@name="city" and @autocomplete="address-level2"]').fill(account.shippingCity)
    // Shippping state/province: This dropdown is currently not filled as it depends on the country, shall be added later
    //Shipping zip code/postal code
    await page.locator('//label[text()="Shipping Zip/Postal Code"]/following-sibling::div/input[@name="postalCode" and @autocomplete="postal-code"]').fill(account.shippingZip)
    await page.locator('//label[text()="Shipping Zip/Postal Code"]/following-sibling::div/input[@name="postalCode" and @autocomplete="postal-code"]').blur()

    // ADDITIONAL INFORMATION
    //Customer priority - 3 options Low, Medium, High
    await page.locator('button[aria-label="Customer Priority"][data-value="--None--"]').click()
    await page.locator(`//div[@aria-label="Customer Priority"]/lightning-base-combobox-item[${account.customerPriorityIndex}]`).click()
    //SLA expiration date (date format - hard coding the date instead of dealing with calendar popup)
    await page.locator('input[name="SLAExpirationDate__c"]').fill(account.slaExpirationDate)
    //Number of locations
    await page.locator('input[name="NumberofLocations__c"][inputmode="decimal"][type="text"]').fill(account.numberOfLocations)
    //Active (dropdown - 3 items)
    await page.locator('button[aria-label="Active"][data-value="--None--"][role="combobox"]').click()
    await page.locator(`//div[@aria-label="Active"]/lightning-base-combobox-item[${account.activeIndex}]`).click()
    //SLA (dropdown - 5 items)
    await page.locator('button[aria-label="SLA"][data-value="--None--"][role="combobox"]').click()
    await page.locator(`//div[@aria-label="SLA"]/lightning-base-combobox-item[${account.slaIndex}]`).click()
    //SLA serial number (10 digits)
    await page.locator('input[name="SLASerialNumber__c"][type="text"][maxlength="10"]').fill(account.slaSerialNumber)
    //Upsell opportunity (dropdown - 4 items)
    await page.locator('button[aria-label="Upsell Opportunity"][data-value="--None--"]').click()
    await page.locator(`//div[@aria-label="Upsell Opportunity"]/lightning-base-combobox-item[${account.upsellIndex}]`).click()
    
    //DESCRIPTION
    await page.locator('textarea[part="textarea"][maxlength="32000"]').fill(account.description)

    //Submit
    await page.locator('button[name="SaveEdit"][type="button"]').click()
})

}

