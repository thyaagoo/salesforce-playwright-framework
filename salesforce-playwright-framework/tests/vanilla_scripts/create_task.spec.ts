import {test} from "@playwright/test"

test.use({
    storageState: 'Data/SalesforceLogin.json'
})

test('Create Task', async ({page}) => {
    await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home")
    await page.locator("//span[text()='Tasks List']").click()
    await page.locator("//span[text()='New Task']").click()
    await page.locator("//input[@aria-label='Subject']").click()
    await page.locator("//span[@title='Send Letter']").click()
    await page.locator("//span[text()='Not Started']").click()
    await page.locator("//li[@role='presentation']/a[@title='In Progress']").click()
    await page.locator("//span[@id='quickTextKeyboardTip']/following-sibling::textarea").fill("Followed up with the customer regarding the pending request and provided the required information")
    await page.locator("//span[text()='Save']").click()
    await page.waitForTimeout(3000)
})