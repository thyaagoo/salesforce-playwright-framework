
First run - storageste.spec.ts
Next, run - create task, delete task, edit task, etc

Day 2: framework tasks
Create Account with Required Field Missing
Goal: validate that Salesforce blocks save when Account Name is empty.

Test flow:
Open New Account form.
Fill a few non-required fields (Phone, Website).
Leave Account Name blank.
Click Save.

Expected result:
Save does not complete.
Validation error appears for Account Name (for example “Complete this field” or required-field message).
Record page is not opened.

Delete Account for Non-Existent Record
Goal: validate safe behavior when target account is not found.
Test flow:
Open Accounts list view.
Search using a guaranteed-random name (example: NoSuchAccount_${Date.now()}).
Attempt delete path only if row exists.
Expected result:
No delete action is available because no matching row exists.
“No records found” (or equivalent empty-state text) is visible.
Test passes by confirming graceful handling, not by forcing a delete click.