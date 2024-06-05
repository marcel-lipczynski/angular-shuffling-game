describe('Test shuffling game', () => {
  const APP_TITLE = 'Star Wars Shuffle'
  const PLAY_AGAIN_BUTTON = 'Play again'
  const RESET_SCORE_BUTTON = 'Reset score'

  beforeEach(() => {
    cy.intercept({url: '*/people/*', method: 'GET'}).as('getPeople');
    cy.intercept({url: '*/starships/*', method: 'GET'}).as('getStarships');
    cy.visit('/')
  });

  it('should display game page properly without score', () => {

    cy.getByDataCy('app-title').contains(APP_TITLE);

    cy.getByDataCy('player-one-score').eq(0);
    cy.getByDataCy('player-two-score').eq(0);

    cy.getByDataCy('play-again-btn').should('contain.text', PLAY_AGAIN_BUTTON).should('be.disabled');
    cy.getByDataCy('reset-score-btn').should('contain.text', RESET_SCORE_BUTTON).should('not.be.disabled');
    cy.getByDataCy('game-mode-toggle').should('be.visible');

    cy.wait(['@getPeople', '@getStarships']);

    cy.getByDataCy('game-card').should('have.length', 10);
  });
});