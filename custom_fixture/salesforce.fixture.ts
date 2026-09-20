import {test as base, expect} from "@playwright/test";
import {AccountsPageClass} from "../pages/AccountsPage";
import {LeadsPage} from "../pages/LeadsPage";

type SalesforceFixtures = {
    accountsPage: AccountsPageClass; //accountsPage is a property of type AccountsPageClass
    leadsPage: LeadsPage; //leadsPage is a property of type LeadsPage (class)
}

const test = base.extend<SalesforceFixtures>({
    accountsPage: async ({page}, use) => {
        await use(new AccountsPageClass(page));
    },
    leadsPage: async ({page},use) => {
        await use(new LeadsPage(page))
    }
});

test.use({
    storageState: "Data/SalesforceLogin.json",
})

export{test, expect};