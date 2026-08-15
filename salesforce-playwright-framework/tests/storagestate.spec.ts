import {test} from "@playwright/test"
import dotenv from 'dotenv'

//dotenv is a Node.js package that loads environment variables from a .env file into process.env.
//process.env is a Node.js object that provides access to environment variables available to the running application.
dotenv.config({path: "Data/credentials.env"})

test('Salesforce authentication - Storage State', async ({page}) => {
    await page.goto(process.env.BASE_URL as string) //“use this environment variable as a string”
    await page.locator("#username").fill(process.env.SALESFORCE_USERNAME as string)
    await page.locator("#password").fill(process.env.SALESFORCE_PASSWORD as string)
    await page.locator(("#Login")).click()
    await page.waitForTimeout(20000)
    await page.context().storageState({path: 'Data/SalesforceLogin.json'})
})