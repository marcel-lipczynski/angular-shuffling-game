import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import _ from 'lodash';
// eslint-disable-next-line import/namespace
import { map } from 'rxjs';

import {
  GameMode,
  GameResource,
  GameResourcesByMode,
} from '../../models/game-resource.model';
import { StarWarsUniverseService } from '../../services/star-wars-universe.service';
import { compareStrings } from '../../utils/integer-parser.utils';
import { ActionsBarComponent } from '../actions-bar/actions-bar.component';
import { GameCardComponent } from '../game-card/game-card.component';

interface Score {
  playerOneScore: number;
  playerTwoScore: number;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    MatRadioModule,
    CommonModule,
    MatGridListModule,
    MatButton,
    MatAnchor,
    GameCardComponent,
    MatSlideToggle,
    FormsModule,
    NgOptimizedImage,
    ActionsBarComponent,
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  selectedMode: GameMode = 'people';

  gameScore: Score = { playerOneScore: 0, playerTwoScore: 0 };

  gameResources: GameResourcesByMode = {
    'people': [],
    'starships': [],
  };

  playerOneResource?: GameResource;
  playerTwoResource?: GameResource;

  winner?: GameResource;

  constructor(private readonly starWarsService: StarWarsUniverseService) {}

  ngOnInit() {
    this.starWarsService
      .getStarshipsList()
      .pipe(
        map((starshipsResponse) => {
          return starshipsResponse.results.map(
            (starship) => new GameResource(starship.name, starship.passengers),
          );
        }),
      )
      .subscribe(
        (starships) => (this.gameResources['starships'] = _.shuffle(starships)),
      );

    this.starWarsService
      .getPeopleList()
      .pipe(
        map((peopleResponse) => {
          return peopleResponse.results.map(
            (person) => new GameResource(person.name, person.mass),
          );
        }),
      )
      .subscribe(
        (people) => (this.gameResources['people'] = _.shuffle(people)),
      );
  }

  private shuffleResources() {
    this.gameResources[this.selectedMode] = _.shuffle(
      this.gameResources[this.selectedMode],
    );
  }

  private chooseWinner() {
    const playerOneValue = this.playerOneResource?.detailAttribute;
    const playerTwoValue = this.playerTwoResource?.detailAttribute;

    const comparisonValue = compareStrings(playerOneValue, playerTwoValue);

    if (comparisonValue === 1) this.winner = this.playerOneResource;
    else if (comparisonValue === 0) this.winner = this.playerTwoResource;
    else this.winner = undefined;

    this.increaseScore();
  }

  private increaseScore() {
    if (this.winner === this.playerOneResource) {
      this.gameScore.playerOneScore++;
    } else if (this.winner === this.playerTwoResource) {
      this.gameScore.playerTwoScore++;
    }
  }

  resetSelectedResources() {
    this.playerOneResource = undefined;
    this.playerTwoResource = undefined;
    this.winner = undefined;

    setTimeout(() => this.shuffleResources(), 500);
  }

  resetScore() {
    this.gameScore = {
      playerOneScore: 0,
      playerTwoScore: 0,
    };

    this.resetSelectedResources();
  }

  selectResource(selectedResource: GameResource) {
    if (this.playerOneResource === undefined) {
      this.playerOneResource = selectedResource;
    } else if (
      this.playerTwoResource === undefined &&
      selectedResource !== this.playerOneResource
    ) {
      this.playerTwoResource = selectedResource;
      this.chooseWinner();
    }
  }
}
