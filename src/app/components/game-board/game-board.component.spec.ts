import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
// eslint-disable-next-line import/namespace
import { EMPTY, of } from 'rxjs';

import { GameBoardComponent } from './game-board.component';
import { ListResponse } from '../../models/api-response.interface';
import { PersonDetailed } from '../../models/person.interface';
import { StarshipDetailed } from '../../models/starship.interface';
import { StarWarsUniverseService } from '../../services/star-wars-universe.service';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let starWarsUniverseService: StarWarsUniverseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
      providers: [
        {
          provide: StarWarsUniverseService,
          useValue: {
            getStarshipsList: jest.fn(() => EMPTY),
            getPeopleList: jest.fn(() => EMPTY),
          },
        },
      ],
    }).compileComponents();

    starWarsUniverseService = TestBed.inject(StarWarsUniverseService);

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch starships and people lists from service on init', () => {
    const starships = [{ name: 'Starship 1' }, { name: 'Starship 2' }];
    const people = [{ name: 'Person 1' }, { name: 'Person 2' }];

    jest
      .spyOn(starWarsUniverseService, 'getStarshipsList')
      .mockReturnValue(
        of({ results: starships } as ListResponse<StarshipDetailed>),
      );
    jest
      .spyOn(starWarsUniverseService, 'getPeopleList')
      .mockReturnValue(of({ results: people } as ListResponse<PersonDetailed>));

    component.ngOnInit();

    expect(component.allStarships).toEqual(starships);
    expect(component.allPeople).toEqual(people);
  });

  it('should correctly shuffle resources', () => {
    const starships = [
      { name: 'Starship 1' },
      { name: 'Starship 2' },
    ] as StarshipDetailed[];
    component.allStarships = starships;

    component.selectedResource = 'starships';
    component['shuffleResources']();

    expect(component.playerOneResource).toBeDefined();
    expect(component.playerTwoResource).toBeDefined();
    expect(starships).toContain(component.playerOneResource);
    expect(starships).toContain(component.playerTwoResource);
  });

  it('should correctly determine the winner', () => {
    const playerOne = { name: 'Person 1', mass: '100' } as PersonDetailed;
    const playerTwo = { name: 'Person 2', mass: '200' } as PersonDetailed;

    component.playerOneResource = playerOne;
    component.playerTwoResource = playerTwo;
    component.selectedResource = 'people';
    component.chooseWinner();

    expect(component.winner).toEqual(playerTwo);
  });

  it('should correctly increase the score', () => {
    const playerOne = { name: 'Person 1', mass: '100' } as PersonDetailed;
    const playerTwo = { name: 'Person 2', mass: '200' } as PersonDetailed;

    component.winner = playerTwo;
    component.playerOneResource = playerOne;
    component.playerTwoResource = playerTwo;

    component.increaseScore();

    expect(component.gameScore.playerTwoScore).toBe(1);
  });

  it('should correctly reset the selected resource', () => {
    component.playerOneResource = { name: 'Person 1' } as PersonDetailed;
    component.playerTwoResource = { name: 'Person 2' } as PersonDetailed;

    component.resetSelectedResource();

    expect(component.playerOneResource).toBeUndefined();
    expect(component.playerTwoResource).toBeUndefined();
  });

  it('should start drawing and stop after 3 seconds', fakeAsync(() => {
    component.chooseWinner = jest.fn();
    component.increaseScore = jest.fn();
    component['shuffleResources'] = jest.fn();

    component.isSpinning = false;
    component.shuffleInterval = undefined;

    component.startDrawing();
    expect(component.isSpinning).toBe(true);

    tick(3000); // Advance time by 3 seconds

    expect(component.isSpinning).toBe(false);

    expect(component.chooseWinner).toHaveBeenCalled();
    expect(component.increaseScore).toHaveBeenCalled();
    expect(component['shuffleResources']).toHaveBeenCalled();
  }));
});
