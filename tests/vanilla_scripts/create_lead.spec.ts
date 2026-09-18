import {test} from "@playwright/test"
import { text } from "node:stream/consumers";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

test ('Create new Lead - POM implementation', async ({page}) => {
      await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home")
      //Leads
      await page.locator("//a[@title='Leads']/span[text()='Leads']").click()
      //New Lead
      await page.locator("//lightning-button[@class='middleButton']/button[@name='New']").click()

      //Salutation dropdown (7 options)
      await page.locator('button[aria-label="Salutation"][data-value="--None--"]').click()
      await page.locator("(//div[@aria-label='Salutation']/lightning-base-combobox-item)[2]").click()

      //First name
      await page.locator('input[name="firstName"][placeholder="First Name"]').fill("Winnie")

      //Last name* MANDATORY FIELD
      await page.locator('input[name="lastName"][placeholder="Last Name"]').fill("Long")

      //Company* MANDATORY FIELD
      await page.locator('input[name="Company"][part="input"]').fill("ABC Corp.")

      //Title
      await page.locator('input[name="Title"][part="input"]').fill("ABC")

      //Lead Source dropdown (6 items)
      await page.locator('button[aria-label="Lead Source"][data-value="--None--"]').click()
      await page.locator("//div[@aria-label='Lead Source']/lightning-base-combobox-item[2]").click()

      //Industry dropdown (33 items)
      await page.locator('button[aria-label="Industry"][data-value="--None--"]').click()
      await page.locator("//div[@aria-label='Industry']/lightning-base-combobox-item[7]").click()
      
      //Annual Revenue
      await page.locator('input[name="AnnualRevenue"][type="text"][class="slds-input"]').fill("49000")

      //Phone
      await page.locator('input[name="Phone"][type="text"][class="slds-input"]').fill("39874654")

      //Mobile
      await page.locator('input[name="MobilePhone"][type="text"][class="slds-input"]').fill("9003847229")

      //Fax
      await page.locator('input[name="Fax"][type="text"][class="slds-input"]').fill("4503")

      //Email
      await page.locator('input[name="Email"][type="text"][class="slds-input"]').fill("jah@cizhaz.hr")

      //Website
      await page.locator('input[name="Website"][type="text"][class="slds-input"]').fill("www.face_9303.de")

      //Lead Status dropdown (5 items)
      await page.locator("//label[text()='Lead Status']").click()
      await page.locator("//div[@aria-label='Lead Status']/lightning-base-combobox-item[3]").click()

      //Rating dropdown (4 items)
      await page.locator('button[aria-label="Rating"][data-value="--None--"]').click()
      await page.locator("//div[@aria-label='Rating']/lightning-base-combobox-item[3]").click()
      
      //No. of employees
      await page.getByRole("spinbutton", {name: 'No. of Employees', exact: true}).fill("230")

      //Country dropdown (236 items)
      await page.locator('input[aria-label="Country"][data-value="--None--"]').click()
      await page.locator("//div[@aria-label='Country']/lightning-base-combobox-item[122]").click()

      //Street
      await page.getByRole("textbox", {name: 'Street', exact: true}).fill("Muller Street")

      //City
      

      //Zip/Post code

      //Product interest dropdown

      //SIC code

      //Number of locations

      //Current Generators(s)

      //Primary dropdown

      //Description
      await page.locator('textarea[part="textarea"][maxlength="32000"]').fill("continent corn anywhere loose north fastened opportunity mad rising name another split rest build favorite freedom accurate horn sheep bite after branch law purpose")

      //Save button
      // await page.locator('button[name="SaveEdit"][type="button"]').click()
      
});