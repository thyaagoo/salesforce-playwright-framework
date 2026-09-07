import { Page } from "@playwright/test";
import { selectors } from "./selectors";

export class HomePage {
    Gpage: Page;
    constructor(Lpage: Page) {
        this.Gpage = Lpage;
    }
    async loadURL() {
        await this.Gpage.goto("https://orgfarm-379ff19658-dev-ed.develop.lightning.force.com/lightning/page/home");
    }
    async clickAccountsModule() {
        await this.Gpage.locator(selectors.home.accountsModuleLink).click();
    }
    async clickNewAccount() {
        await this.Gpage.locator(selectors.home.newAccountBtn).click();
    }
}