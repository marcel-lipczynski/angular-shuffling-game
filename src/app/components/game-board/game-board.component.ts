import { CommonModule } from '@angular/common';
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
import { parseStringToInt } from '../../utils/integer-parser.utils';
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
    if (this.selectedResource === 'people') {
      this.allPeople = _.shuffle(this.allPeople);
      this.playerOneResource = this.allPeople[0];
      this.playerTwoResource = this.allPeople[1];
    } else {
      this.allStarships = _.shuffle(this.allStarships);
      this.playerOneResource = this.allStarships[0];
      this.playerTwoResource = this.allStarships[1];
    }
  }

  chooseWinner() {
    if (this.selectedResource === 'people') {
      this.winner =
        parseStringToInt((this.playerOneResource as PersonDetailed).mass) >
        parseStringToInt((this.playerTwoResource as PersonDetailed).mass)
          ? this.playerOneResource
          : this.playerTwoResource;
    } else {
      this.winner =
        parseStringToInt(
          (this.playerOneResource as StarshipDetailed).passengers,
        ) >
        parseStringToInt(
          (this.playerTwoResource as StarshipDetailed).passengers,
        )
          ? this.playerOneResource
          : this.playerTwoResource;
    }
  }

  increaseScore() {
    if (this.winner === this.playerOneResource) {
      this.gameScore.playerOneScore++;
    } else {
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
  }
}
