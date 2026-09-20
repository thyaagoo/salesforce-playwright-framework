import { test } from "../custom_fixture/salesforce.fixture";
import createLeadData from "../Data/create_lead_data.json";

const lead = createLeadData[0];

test(`Create new lead - ${lead.lastName}`, async ({ leadsPage }) => {
    await leadsPage.loadURL(); //loadURL is inherited from HomePage.ts
    await leadsPage.openLeadsPage(); //Inherited from HomePage.ts
    await leadsPage.clickNewLead();
    await leadsPage.fillLeadForm(lead);
    await leadsPage.clickSaveLead();
    await leadsPage.assertLeadCreated();
});