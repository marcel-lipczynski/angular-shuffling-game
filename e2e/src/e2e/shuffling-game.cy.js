import { User } from '../support/actors/user';

describe('Test shuffling game', () => {
  const userActor = new User();

  beforeEach(() => {
    userActor.interceptGameResourceRequest();
    cy.visit('/');
  });

  it('should display game page properly without score', () => {
    userActor.shouldVerifyPageContentOnLoad();
  });
});
