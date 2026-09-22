import { Page } from "@playwright/test";

export class HomePage {
    Gpage: Page; //Gpage of property type Page

    constructor(Lpage: Page) {
        this.Gpage = Lpage;
    }

    //LOAD THE URL
    async loadURL() {
        await this.Gpage.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home");
    }

    //ACCOUNTS
    async clickAccountsModule() {
        await this.Gpage.locator("//a[@title='Accounts']/span[text()='Accounts']").click();
    }
    async clickNewAccount() {
        await this.Gpage.locator("//a[@title='New']/div[@title='New']").click();
    }

    //LEADS
    async openLeadsPage() {
        await this.Gpage.locator("//a[@title='Leads']/span[text()='Leads']").click();
  }
}