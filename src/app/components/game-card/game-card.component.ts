import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { GameMode, GameResource } from '../../models/game-resource.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage, MatButton],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input() gameResource?: GameResource;

  @Input() winner?: GameResource;

  @Input() selectedResource!: GameMode;

  @Input() isFlipped = false;
}
