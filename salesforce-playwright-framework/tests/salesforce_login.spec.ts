import {test} from "@playwright/test"

test.use({
    storageState: 'Data/SalesforceLogin.json'
})

test("Skip Salesforce Login", async ({page}) => {
    await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home")
    await page.locator("//span[text()='App Launcher']").click()
})