import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PersonDetailed } from '../../models/person.interface';
import { PlayableResource } from '../../models/playable-resource.type';
import { StarshipDetailed } from '../../models/starship.interface';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage, MatButton],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input() gameResource?: PersonDetailed | StarshipDetailed;

  @Input() selectedResource!: PlayableResource;

  isStarship(
    gameResource: PersonDetailed | StarshipDetailed,
  ): gameResource is StarshipDetailed {
    return (gameResource as StarshipDetailed).passengers !== undefined;
  }
}
