import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';
import { Person } from '../../models/person.interface';
import { Starship } from '../../models/starship.interface';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly identify a starship', () => {
    const starship = {
      name: 'Millennium Falcon',
      passengers: '10',
    } as Starship;
    expect(component.isStarship(starship)).toBe(true);

    const person = {
      name: 'Luke Skywalker',
    } as Person;
    expect(component.isStarship(person)).toBe(false);
  });
});
