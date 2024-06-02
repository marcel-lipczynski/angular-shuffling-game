import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameBoardComponent } from './components/game-board/game-board.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    NgForOf,
    NgClass,
    NgStyle,
    NavbarComponent,
    GameBoardComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
