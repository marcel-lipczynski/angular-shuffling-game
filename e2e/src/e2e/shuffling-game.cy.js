import { User } from '../support/actors/user';

describe('Test shuffling game', () => {
  const userActor = new User();

  beforeEach(() => {
    userActor.interceptGameResourceRequest();
    cy.visit('/');
    cy.wait(['@getPeople', '@getStarships']);
  });

  it('should display game page properly without score', () => {
    userActor.shouldVerifyPageContentOnLoad();
  });

  it('should flip only two selected cards even though third was clicked', () => {
    userActor.shouldFlipOnlyTwoSelectedCards();
  });

  it('should increase the score and select winner if someone wins', () => {
    userActor.shouldIncreaseScoreAndSelectWinner();
  });

  it('should switch game mode to starships on toggle click', () => {
    userActor.shouldSwitchGameModeToStarshipsOnToggleClick();
  });

  it('should restart game on play again button click', () => {
    userActor.shouldRestartGameOnPlayAgainButtonClick();
  });

  it('should reset game and score on reset game button click', () => {
    userActor.shouldResetGameAndScoreOnResetGameButtonClick();
  });
});
