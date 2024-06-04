import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { GameMode } from '../../models/game-resource.model';

@Component({
  selector: 'app-actions-bar',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonToggleModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './actions-bar.component.html',
  styleUrl: './actions-bar.component.scss',
})
export class ActionsBarComponent {
  @Input() gameScore = { playerOneScore: 0, playerTwoScore: 0 };
  @Input() isPlaying = false;

  @Output() gameModeChanged = new EventEmitter<GameMode>();
  @Output() resetScore = new EventEmitter<void>();
  @Output() playAgain = new EventEmitter<void>();

  gameMode: GameMode = 'people';
}
