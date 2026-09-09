# Salesforce Playwright Framework

A TypeScript-based Salesforce UI automation framework built with Playwright Test. The framework currently demonstrates Page Object Model, centralized selectors, custom fixtures, storage-state authentication, data-driven tests, negative testing, file upload validation, and Playwright reporting artifacts.

## Current Framework Structure

```text
salesforce-playwright-framework
|- Data/
|  |- create_account_data.json
|  |- delete_account_data.json
|  |- credentials.env
|  |- SalesforceLogin.json
|  |- samplefile.txt
|- Utils/
|  |- randomGenerators.ts
|- custom_fixture/
|  |- salesforce.fixture.ts
|- pages/
|  |- AccountsPage.ts
|  |- HomePage.ts
|  |- selectors.ts
|- tests/
|  |- TC001_create_account.spec.ts
|  |- TC002_modify_account.spec.ts
|  |- TC003_delete_account.spec.ts
|  |- TC004_account_negativecase.spec.ts
|  |- storagestate.spec.ts
|- playwright.config.ts
|- tsconfig.json
|- package.json
|- playwright-report/
|- test-results/
```

## JavaScript Concepts Used

The project uses TypeScript, which is built on JavaScript. The following JavaScript concepts are implemented in the framework.

### ES Modules

The framework uses `import` and `export` to share page objects, fixtures, selectors, and utilities.

```ts
import { AccountsPageClass } from "../pages/AccountsPage";
export function generateRandomPhone(): string {
  // Implementation omitted here for brevity.
  return "";
}
```

### Classes and Objects

Page objects are implemented as classes, and objects are created from those classes.

```ts
new AccountsPageClass(page);
```

### Class Inheritance

`AccountsPageClass` extends `HomePage`, allowing it to reuse common home and navigation methods.

```ts
export class AccountsPageClass extends HomePage {
}
```

### Constructors

The Playwright `Page` object is passed into page-object constructors and stored for later use.

### Functions and Methods

The project uses utility functions, class methods, test callbacks, and fixture callbacks.

### Arrow Functions

Arrow functions are used in Playwright tests, fixture definitions, and dynamic selector functions.

### Async and Await

Browser operations are asynchronous and are handled with `async` and `await`.

### Arrays and `for...of` Loops

JSON arrays are used to generate multiple tests from account data.

```ts
for (const account of accountsJSONInput) {
  test(`Create new account - ${account.accountName}`, async () => {
  });
}
```

### Object Literals and Nested Objects

The selector file organizes selectors into nested `home` and `accounts` objects.

### Template Literals

Template literals are used for dynamic test names, dynamic selectors, and generated values.

### Random Data Generation

`Math.random()`, `Date.now()`, and string methods are used to generate unique phone numbers and website values in `Utils/randomGenerators.ts`.

### Environment Variables

`dotenv` loads credentials from `Data/credentials.env`, and values are read through `process.env`.

## TypeScript Concepts Used

### Static Typing

Variables, method parameters, return values, and Playwright page objects use explicit types.

```ts
Gpage: Page;

async updatePhoneAndWebsite(phone: string, website: string) {
}
```

### Type Aliases

`AccountData` defines the expected structure of account test data.

```ts
type AccountData = {
  accountName: string;
  accountNumber: string;
  phone: string;
};
```

### Object Typing

`SalesforceFixtures` describes the custom fixture available to tests.

```ts
type SalesforceFixtures = {
  accountsPage: AccountsPageClass;
};
```

### Generics

The custom fixture uses a generic type to extend Playwright's test object safely.

```ts
base.extend<SalesforceFixtures>({
});
```

### Type Inference

TypeScript infers the type of values such as `account` when iterating through imported JSON data.

### Type Assertions

Environment variables are asserted as strings when passed to Playwright methods.

```ts
process.env.BASE_URL as string;
```

### Literal Types

The selector configuration uses `as const` for role values such as `spinbutton`.

### JSON Module Imports

`resolveJsonModule` is enabled in `tsconfig.json`, allowing JSON data files to be imported directly into tests.

### Class Extension

TypeScript class inheritance is used for the page-object relationship between `HomePage` and `AccountsPageClass`.

## Playwright Concepts Used

### Playwright Test Runner

Tests are defined with Playwright's `test` function and run through the Playwright CLI.

```sh
npx playwright test
```

### Built-in Fixtures

The framework uses the built-in `page` fixture for browser interaction.

### Custom Fixtures

`custom_fixture/salesforce.fixture.ts` extends Playwright's base test with an `accountsPage` fixture.

```ts
const test = base.extend<SalesforceFixtures>({
  accountsPage: async ({ page }, use) => {
    await use(new AccountsPageClass(page));
  },
});
```

### Storage State Authentication

`tests/storagestate.spec.ts` logs into Salesforce and creates `Data/SalesforceLogin.json`. The custom fixture reuses that saved authentication state for the business tests.

### Page Object Model

Page classes contain Salesforce UI behavior, while test files contain scenario orchestration.

Current page objects:
- `HomePage`
- `AccountsPageClass`

### Centralized Selectors

`pages/selectors.ts` stores selectors separately from page behavior. Selectors are grouped by application area and dynamic selectors are represented as functions.

### Locators

The framework uses:
- CSS selectors
- XPath selectors
- role-based locators
- text-based locators

Examples include `locator`, `getByRole`, and `getByText`.

### Browser Actions

Implemented browser actions include:
- page navigation
- clicking
- filling fields
- blurring fields
- selecting dropdown values
- file uploads

### Assertions

The framework uses Playwright assertions such as:

```ts
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
```

Assertions currently verify creation, update, deletion, upload, required-field errors, and error-icon visibility.

### Data-driven Testing

Account creation and deletion tests use JSON arrays to generate multiple test cases.

### Positive and Negative Testing

The framework includes:
- account creation
- account modification
- account deletion
- missing required-field validation

### File Upload Testing

The account creation flow uploads a file and verifies the upload success message.

### Browser Project Configuration

The current configuration runs Chromium. Firefox, WebKit, mobile, Edge, and Chrome-channel project examples are present in commented configuration.

### Test Configuration

`playwright.config.ts` defines:
- test directory
- test timeout
- retries
- worker behavior
- CI-specific settings
- browser project configuration
- permissions
- headed execution

### HTML Reporting

The built-in Playwright HTML reporter is enabled:

```ts
reporter: [["html", { open: "always" }]]
```

### Trace, Video, and Screenshot Artifacts

The configuration enables trace, video, and screenshot collection for debugging and test evidence.

### CI-aware Configuration

The framework changes retries, worker count, and `test.only` handling when `CI` is set.

## How Authentication Works

1. Store Salesforce credentials in `Data/credentials.env`.
2. Run `tests/storagestate.spec.ts` to log in.
3. The test saves the authenticated browser state to `Data/SalesforceLogin.json`.
4. Business tests import `custom_fixture/salesforce.fixture.ts`.
5. The fixture applies the saved state and injects `accountsPage`.

## Running Tests

Run the full suite:

```sh
npx playwright test
```

Run a single test file:

```sh
npx playwright test TC001_create_account.spec.ts
```

Run with a visible browser:

```sh
npx playwright test --headed
```

Open the Playwright report:

```sh
npx playwright show-report
```

## Currently Not Implemented

The following items are possible future framework improvements, but are not currently part of the implemented framework:

- A `PlaywrightWrapper` or `BasePage` common-action class
- `LeadsPage`
- `TasksPage`
- Leads and Tasks fixtures
- Allure reporting
- API testing
- API-based test data setup
- Environment-specific configuration such as QA and UAT
- Smoke and regression tags
- GitHub Actions workflow
- Component objects
- Login page object
- TypeScript path aliases
- JSON schema validation
- Automatic cleanup of created Salesforce records

## Interview Summary

This framework can be described as:

> A TypeScript-based Salesforce Playwright framework using Page Object Model, centralized selectors, JSON-driven data-driven testing, custom fixtures, reusable authentication storage state, positive and negative scenarios, file upload validation, and Playwright HTML reporting with trace, video, and screenshot artifacts.
