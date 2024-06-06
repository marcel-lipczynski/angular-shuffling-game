import { StarWarsShufflingGameView } from '../views/star-wars-shuffling-game.view';

export class User {
  public onStarWarsShufflingGameView() {
    return new StarWarsShufflingGameView();
  }

  public shouldVerifyPageContentOnLoad() {
    const page = this.onStarWarsShufflingGameView();
    page.shouldVerifyPageContentOnLoad();
  }

  public shouldFlipOnlyTwoSelectedCards() {
    const page = this.onStarWarsShufflingGameView();
    page.shouldFlipOnlyTwoSelectedCards();
  }

  public shouldIncreaseScoreAndSelectWinner() {
    const page = this.onStarWarsShufflingGameView();
    page.shouldIncreaseScoreAndSelectWinner();
  }

  public shouldSwitchGameModeToStarshipsOnToggleClick() {
    const page = this.onStarWarsShufflingGameView();
    page.shouldSwitchGameModeToStarshipsOnToggleClick();
  }

  public shouldRestartGameOnPlayAgainButtonClick() {
    const page = this.onStarWarsShufflingGameView();
    page.shouldRestartGameOnPlayAgainButtonClick();
  }

  public shouldResetGameAndScoreOnResetGameButtonClick() {
    const page = this.onStarWarsShufflingGameView();
    page.shouldResetGameAndScoreOnResetGameButtonClick();
  }

  public interceptGameResourceRequest() {
    cy.intercept({ url: '*/people/*', method: 'GET' }).as('getPeople');
    cy.intercept({ url: '*/starships/*', method: 'GET' }).as('getStarships');
  }
}
