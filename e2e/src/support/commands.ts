/**
 *  select html element by data-cy selector
 */

Cypress.Commands.add('getByDataCy', (selector) =>
  cy.get(`[data-cy="${selector}"]`),
);
