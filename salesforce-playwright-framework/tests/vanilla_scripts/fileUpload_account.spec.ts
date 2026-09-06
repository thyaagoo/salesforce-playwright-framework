import { test, expect } from "@playwright/test";

test.use({
  storageState: "Data/SalesforceLogin.json",
});

test('File upload test in Salesforce accounts', async ({page}) => {
  const uniqueSuffix = Date.now();
  const accountName = `File upload ${uniqueSuffix}`;

  await page.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home");

  // Open Accounts and create a simple account so this test is self-contained.
  await page.locator("//a[@title='Accounts']/span[text()='Accounts']").click();
  await page.locator("//a[@title='New']/div[@title='New']").click();
  await page.locator('input[class="slds-input"][name="Name"][part="input"]').fill(accountName);
  await page.locator("//button[@name='SaveEdit'] | //button[@name='Save']").first().click();
  //Verify if new account is created
  await expect(page.getByText("was created", { exact: false })).toBeVisible();

  //File upload steps
  const fileElement = page.locator('input[type="file"]').first();
  // await expect(fileElement).toBeVisible();
  await fileElement.setInputFiles('Data/samplefile.txt');

  //Click on Done button once upload slider is completed 100% and Done button gets enabled
  const doneButton = page.locator("//button[contains(@class,'desktop uiButton--default')]/span[text()='Done']")
  await expect(doneButton).toBeEnabled()
  doneButton.click()

  //File upload assertion
  await expect(page.getByText("was uploaded", {exact: false})).toBeVisible()
})