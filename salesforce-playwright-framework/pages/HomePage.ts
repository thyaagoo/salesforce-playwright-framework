import { Page } from "@playwright/test";

export class HomePage {
    Gpage: Page;
    constructor(Lpage: Page) {
        this.Gpage = Lpage;
    }
    async loadURL() {
        await this.Gpage.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home");
    }
    async clickAccountsModule() {
        await this.Gpage.locator("//a[@title='Accounts']/span[text()='Accounts']").click();
    }
    async clickNewAccount() {
        await this.Gpage.locator("//a[@title='New']/div[@title='New']").click();
    }
}