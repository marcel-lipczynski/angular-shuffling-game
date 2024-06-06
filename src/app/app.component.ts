import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ActionsBarComponent } from './components/actions-bar/actions-bar.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgForOf,
    NgClass,
    NgStyle,
    ActionsBarComponent,
    GameBoardComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
