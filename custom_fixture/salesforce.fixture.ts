import {test as base, expect} from "@playwright/test";
import {AccountsPageClass} from "../pages/AccountsPage";
import {LeadsPageClass} from "../pages/LeadsPage";
import {HomePage} from "../pages/HomePage";

type SalesforceFixtures = {
    homePage: HomePage; //homePage is a property of type HomePage
    accountsPage: AccountsPageClass; //accountsPage is a property of type AccountsPageClass
    leadsPage: LeadsPageClass; //leadsPage is a property of type LeadsPage (class)
}

const test = base.extend<SalesforceFixtures>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    accountsPage: async ({page}, use) => {
        await use(new AccountsPageClass(page));
    },
    leadsPage: async ({page},use) => {
        await use(new LeadsPageClass(page))
    }
});

test.use({
    storageState: "Data/SalesforceLogin.json",
})

export{test, expect};