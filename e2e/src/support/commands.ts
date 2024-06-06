/**
 *  select html element by data-cy selector
 */

Cypress.Commands.add('getByDataCy', (selector) =>
  cy.get(`[data-cy="${selector}"]`),
);

Cypress.Commands.add(
  'findByDataCy',
  { prevSubject: true },
  (subject, selector) => {
    return cy.wrap(subject).find(`[data-cy=${selector}]`);
  },
);
