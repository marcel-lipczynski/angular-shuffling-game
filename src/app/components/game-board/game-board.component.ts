import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import _ from 'lodash';

import { PersonDetailed } from '../../models/person.interface';
import { PlayableResource } from '../../models/playable-resource.type';
import { StarshipDetailed } from '../../models/starship.interface';
import { StarWarsUniverseService } from '../../services/star-wars-universe.service';
import { compareStrings } from '../../utils/integer-parser.utils';
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
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  isSpinning = false;

  gameScore: Score = { playerOneScore: 0, playerTwoScore: 0 };

  allPeople?: PersonDetailed[];
  allStarships?: StarshipDetailed[];

  playerOneResource?: PersonDetailed | StarshipDetailed;
  playerTwoResource?: PersonDetailed | StarshipDetailed;

  winner?: PersonDetailed | StarshipDetailed;

  shuffleInterval: any;

  selectedResource: PlayableResource = 'people';

  constructor(private readonly starWarsService: StarWarsUniverseService) {}

  ngOnInit() {
    this.starWarsService
      .getStarshipsList()
      .subscribe(
        (starshipsResponse) => (this.allStarships = starshipsResponse.results),
      );

    this.starWarsService
      .getPeopleList()
      .subscribe((peopleResponse) => (this.allPeople = peopleResponse.results));
  }

  startDrawing() {
    this.isSpinning = true;

    this.shuffleInterval = setInterval(() => {
      this.shuffleResources();
    }, 50);

    setTimeout(() => {
      clearInterval(this.shuffleInterval);
      this.isSpinning = false;
      this.chooseWinner();
      this.increaseScore();
    }, 3000);
  }

  private shuffleResources() {
    let resources: (PersonDetailed | StarshipDetailed)[];

    if (this.selectedResource === 'people') {
      resources = _.shuffle(this.allPeople);
    } else {
      resources = _.shuffle(this.allStarships);
    }

    this.playerOneResource = resources[0];
    this.playerTwoResource = resources[1];
  }

  chooseWinner() {
    const playerOneValue = this.getProperty(this.playerOneResource);
    const playerTwoValue = this.getProperty(this.playerTwoResource);

    const comparisonValue = compareStrings(playerOneValue, playerTwoValue);

    if (comparisonValue === 1) this.winner = this.playerOneResource;
    else if (comparisonValue === 0) this.winner = this.playerTwoResource;
    else this.winner = undefined;
  }

  private getProperty(resource?: PersonDetailed | StarshipDetailed): string {
    return this.selectedResource === 'people'
      ? (resource as PersonDetailed).mass
      : (resource as StarshipDetailed).passengers;
  }

  increaseScore() {
    if (this.winner === this.playerOneResource) {
      this.gameScore.playerOneScore++;
    } else if (this.winner === this.playerTwoResource) {
      this.gameScore.playerTwoScore++;
    }
  }

  resetSelectedResource() {
    this.playerOneResource = undefined;
    this.playerTwoResource = undefined;
  }

  resetScore() {
    this.gameScore = {
      playerOneScore: 0,
      playerTwoScore: 0,
    };

    this.resetSelectedResource();
  }

  selectResource(selectedResource: PersonDetailed | StarshipDetailed) {
    if (this.playerOneResource === undefined) {
      this.playerOneResource = selectedResource;
    } else if (
      this.playerTwoResource === undefined &&
      selectedResource !== this.playerOneResource
    ) {
      this.playerTwoResource = selectedResource;
    }
  }
}
