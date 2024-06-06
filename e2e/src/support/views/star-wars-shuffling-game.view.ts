export class StarWarsShufflingGameView {
  private static APP_TITLE_SELECTOR = 'app-title';
  private static PLAY_AGAIN_BUTTON_SELECTOR = 'play-again-btn';
  private static RESET_SCORE_BUTTON_SELECTOR = 'reset-score-btn';
  private static STARSHIPS_GAME_MODE_SELECTOR = 'starships-mode';
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

    this.gameCards().should('have.length', 10);
  }

  public shouldFlipOnlyTwoSelectedCards() {
    const firstCard = this.gameCardByIndex(0);
    const secondCard = this.gameCardByIndex(1);
    const thirdCard = this.gameCardByIndex(2);

    firstCard.click();
    firstCard.children('div').should('have.class', 'flipped');

    secondCard.click();
    secondCard.children('div').should('have.class', 'flipped');

    thirdCard.click();
    thirdCard.children('div').should('not.have.class', 'flipped');
  }

  public shouldIncreaseScoreAndSelectWinner() {
    let playerOneScore: number;
    let playerTwoScore: number;

    const firstCard = this.gameCardByIndex(0);
    const secondCard = this.gameCardByIndex(1);

    firstCard.click();
    secondCard.click();

    firstCard
      .findByDataCy('detail-attribute')
      .invoke('text')
      .then((playerOneText) => {
        playerOneScore = parseInt(playerOneText.split(' ')[2], 10);
      });

    secondCard
      .findByDataCy('detail-attribute')
      .invoke('text')
      .then((playerTwoText) => {
        playerTwoScore = parseInt(playerTwoText.split(' ')[2], 10);
      });

    cy.then(() => {
      if (playerOneScore > playerTwoScore) {
        cy.getByDataCy('player-one-score').contains('1');
        this.gameCardByIndex(0).find('.winner');
        expect(playerOneScore).to.be.greaterThan(playerTwoScore);
      } else if (playerTwoScore > playerOneScore) {
        cy.getByDataCy('player-two-score').contains('1');
        this.gameCardByIndex(1).find('.winner');
        expect(playerTwoScore).to.be.greaterThan(playerOneScore);
      } else {
        cy.getByDataCy('player-one-score').contains('0');
        cy.getByDataCy('player-two-score').contains('0');
        expect(playerOneScore).to.equal(playerTwoScore);
      }
    });
  }

  public shouldSwitchGameModeToStarshipsOnToggleClick() {
    this.starshipsGameMode().click();

    const firstCard = this.gameCardByIndex(0);

    firstCard.click();

    firstCard
      .findByDataCy('detail-attribute')
      .invoke('text')
      .then((playerOneText) => {
        expect(playerOneText).to.contains('Passengers');
      });
  }

  public shouldRestartGameOnPlayAgainButtonClick() {
    const firstCard = this.gameCardByIndex(0);
    const secondCard = this.gameCardByIndex(1);

    firstCard.click();
    firstCard.children('div').should('have.class', 'flipped');

    secondCard.click();
    secondCard.children('div').should('have.class', 'flipped');

    this.playAgainButton().click();

    // using firstCard and secondCard variable does not work in this place
    this.gameCardByIndex(0).children('div').should('not.have.class', 'flipped');
    this.gameCardByIndex(1).children('div').should('not.have.class', 'flipped');
  }

  public shouldResetGameAndScoreOnResetGameButtonClick() {
    this.shouldIncreaseScoreAndSelectWinner();

    const firstCard = this.gameCardByIndex(0);
    const secondCard = this.gameCardByIndex(1);

    firstCard.click();
    secondCard.click();

    this.resetScoreButton().click();

    firstCard.children('div').should('not.have.class', 'flipped');
    secondCard.children('div').should('not.have.class', 'flipped');

    this.playerOneScore().eq(0);
    this.playerTwoScore().eq(0);
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

  private gameModeToggle() {
    return cy.getByDataCy(StarWarsShufflingGameView.GAME_MODE_TOGGLE_SELECTOR);
  }

  private resetScoreButton() {
    return cy.getByDataCy(
      StarWarsShufflingGameView.RESET_SCORE_BUTTON_SELECTOR,
    );
  }

  private starshipsGameMode() {
    return cy.getByDataCy(
      StarWarsShufflingGameView.STARSHIPS_GAME_MODE_SELECTOR,
    );
  }

  private gameCards() {
    return cy.getByDataCy(StarWarsShufflingGameView.GAME_CARD_SELECTOR);
  }

  private gameCardByIndex(index: number) {
    return this.gameCards().eq(index);
  }
}
