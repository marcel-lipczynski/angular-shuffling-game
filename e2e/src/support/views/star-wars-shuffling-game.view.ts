export class StarWarsShufflingGameView {
  private static APP_TITLE_SELECTOR = 'app-title';
  private static PLAY_AGAIN_BUTTON_SELECTOR = 'play-again-btn';
  private static RESET_SCORE_BUTTON_SELECTOR = 'reset-score-btn';
  private static GAME_MODE_TOGGLE_SELECTOR = 'game-mode-toggle';
  private static GAME_CARD_SELECTOR = 'game-card';
  private static PLAYER_ONE_SCORE_SELECTOR = 'player-one-score';
  private static PLAYER_TWO_SCORE_SELECTOR = 'player-two-score';

  public shouldVerifyPageContentOnLoad() {
    this.appTitle().contains('Star Wars Shuffle');
    this.playerOneScore().eq(0);
    this.playerTwoScore().eq(0);

    this.playAgainButton()
      .should('contain.text', 'Play again')
      .should('be.disabled');

    this.resetScoreButton()
      .should('contain.text', 'Reset score')
      .should('not.be.disabled');

    this.gameModeToggle().should('be.visible');

    cy.wait(['@getPeople', '@getStarships']);

    this.gameCards().should('have.length', 10);
  }

  private appTitle() {
    return cy.getByDataCy(StarWarsShufflingGameView.APP_TITLE_SELECTOR);
  }

  private playerOneScore() {
    return cy.getByDataCy(StarWarsShufflingGameView.PLAYER_ONE_SCORE_SELECTOR);
  }

  private playerTwoScore() {
    return cy.getByDataCy(StarWarsShufflingGameView.PLAYER_TWO_SCORE_SELECTOR);
  }

  private playAgainButton() {
    return cy.getByDataCy(StarWarsShufflingGameView.PLAY_AGAIN_BUTTON_SELECTOR);
  }

  private resetScoreButton() {
    return cy.getByDataCy(
      StarWarsShufflingGameView.RESET_SCORE_BUTTON_SELECTOR,
    );
  }

  private gameModeToggle() {
    return cy.getByDataCy(StarWarsShufflingGameView.GAME_MODE_TOGGLE_SELECTOR);
  }

  private gameCards() {
    return cy.getByDataCy(StarWarsShufflingGameView.GAME_CARD_SELECTOR);
  }

  private gameCardByIndex(index: number) {
    return this.gameCards().eq(index);
  }
}
