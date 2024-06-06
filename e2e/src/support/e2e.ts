// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands';

// eslint-disable-next-line @typescript-eslint/no-namespace,@typescript-eslint/no-unused-vars

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable {
      getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
      findByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
