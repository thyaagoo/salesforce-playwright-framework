import {test as base, expect} from "@playwright/test";
import {AccountsPageClass} from "../pages/AccountsPage";

type SalesforceFixtures = {
    accountsPage: AccountsPageClass; //accountsPage is a property of type AccountsPageClass
}

const test = base.extend<SalesforceFixtures>({
    accountsPage: async ({page}, use) => {
        await use(new AccountsPageClass(page));
    }
});

test.use({
    storageState: "../Data/SalesforceLogin.json",
})

export{test, expect};