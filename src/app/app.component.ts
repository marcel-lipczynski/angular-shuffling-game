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
export class AppComponent {
  people = [
    { name: '0', age: 25 },
    { name: '1', age: 30 },
    { name: '2', age: 35 },
    { name: '3', age: 35 },
    { name: '4', age: 35 },
    { name: '5', age: 35 },
    { name: '6', age: 35 },
    { name: '7', age: 35 },
    { name: '8', age: 35 },
    { name: '9', age: 35 },
    { name: '10', age: 35 },
    { name: '11', age: 25 },
    { name: '12', age: 30 },
    { name: '13', age: 35 },
    { name: '14', age: 35 },
    { name: '15', age: 35 },
    { name: '16', age: 35 },
    { name: '17', age: 35 },
    { name: '6', age: 35 },
    { name: '7', age: 35 },
    { name: '8', age: 35 },
    { name: '0', age: 35 },
  ];

  isSpinning = false;

  shufflePeople() {
    // this.people = this.people.sort(() => Math.random() - 0.5);
    this.isSpinning = true;

    setTimeout(() => {
      this.isSpinning = false;
    }, 2000);
  }
}
