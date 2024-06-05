import { StarWarsShufflingGameView } from '../views/star-wars-shuffling-game.view';

export class User {
  public onStarWarsShufflingGameView() {
    return new StarWarsShufflingGameView();
  }

  public shouldVerifyPageContentOnLoad() {
    const page = this.onStarWarsShufflingGameView();
    page.shouldVerifyPageContentOnLoad();
  }

  public interceptGameResourceRequest() {
    cy.intercept({ url: '*/people/*', method: 'GET' }).as('getPeople');
    cy.intercept({ url: '*/starships/*', method: 'GET' }).as('getStarships');
  }
}
