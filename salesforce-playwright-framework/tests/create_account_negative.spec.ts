import {test, expect} from "@playwright/test"

test.use({
      storageState: "Data/SalesforceLogin.json"
})

test('Create account - negative case', async ({page}) => {
    await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home")
    //Accounts
    await page.locator("//a[@title='Accounts']/span[text()='Accounts']").click()
    //New Account
    await page.locator("//a[@title='New']/div[@title='New']").click()
    //Phone
    await page.locator('input[name="Phone"][type="text"][class="slds-input"]').fill("90038456")
    //Website
    await page.locator('input[name="Website"][type="text"][class="slds-input"]').fill("cekle@fam.iq")

    //Submit
    await page.locator('button[name="SaveEdit"][type="button"]').click()

    //Assert error message at account name field
    const text = await page.locator("//*[normalize-space(text())='Complete this field.']").textContent()
    expect(text).toBe('Account NameComplete this field.')

    //Assert that error message is displayed (common)
    const isErrorVisible = await page.locator('lightning-primitive-icon[variant="error"][exportparts="icon"]').isVisible()
    if (isErrorVisible) {
        console.log("Record not created. Account number field is empty")
        console.log("Test is passed")
    } else {
        console.log("Record is created")
        console.log("Test failed")
    }
})