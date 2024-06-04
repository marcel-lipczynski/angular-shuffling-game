import { ComponentFixture, TestBed } from '@angular/core/testing';
// eslint-disable-next-line import/namespace
import { EMPTY, of } from 'rxjs';

import { GameBoardComponent } from './game-board.component';
import { ListResponse } from '../../models/api-response.interface';
import { GameResource } from '../../models/game-resource.model';
import { Person } from '../../models/person.interface';
import { Starship } from '../../models/starship.interface';
import { StarWarsUniverseService } from '../../services/star-wars-universe.service';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let starWarsServiceMock: StarWarsUniverseService;

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

    starWarsServiceMock = TestBed.inject(StarWarsUniverseService);

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load starships and people resources', () => {
      const mockStarshipsResponse = {
        results: [{ name: 'Starship 1', passengers: '100' }],
      } as ListResponse<Starship>;
      const mockPeopleResponse = {
        results: [{ name: 'Person 1', mass: '70' }],
      } as ListResponse<Person>;

      starWarsServiceMock.getStarshipsList = jest.fn(() =>
        of(mockStarshipsResponse),
      );
      starWarsServiceMock.getPeopleList = jest.fn(() => of(mockPeopleResponse));

      component.ngOnInit();

      expect(component.gameResources['starships']).toEqual([
        new GameResource('Starship 1', '100'),
      ]);
      expect(component.gameResources['people']).toEqual([
        new GameResource('Person 1', '70'),
      ]);
    });
  });

  describe('resetScore', () => {
    it('should reset the score and call resetSelectedResources', () => {
      const resetSelectedResourcesSpy = jest.spyOn(
        component,
        'resetSelectedResources',
      );

      component.resetScore();

      expect(component.gameScore).toEqual({
        playerOneScore: 0,
        playerTwoScore: 0,
      });
      expect(resetSelectedResourcesSpy).toHaveBeenCalled();
    });
  });

  it('should set playerOneResource if it is undefined', () => {
    const resource = new GameResource('Resource 1', '100');

    component.selectResource(resource);

    expect(component.playerOneResource).toBe(resource);
  });

  it('should set playerTwoResource and choose winner if playerOneResource is defined', () => {
    const resource1 = new GameResource('Resource 1', '100');
    const resource2 = new GameResource('Resource 2', '200');

    component.playerOneResource = resource1;

    component.selectResource(resource2);

    expect(component.playerTwoResource).toBe(resource2);
    expect(component.winner).toBe(resource2);
  });

  it('should increase playerOneScore if playerOneResource wins', () => {
    const resource1 = new GameResource('Resource 1', '200');
    const resource2 = new GameResource('Resource 2', '100');

    component.playerOneResource = resource1;
    component.playerTwoResource = resource2;

    component['chooseWinner']();

    expect(component.winner).toBe(resource1);
    expect(component.gameScore.playerOneScore).toBe(1);
  });

  it('should increase playerTwoScore if playerTwoResource wins', () => {
    const resource1 = new GameResource('Resource 1', '100');
    const resource2 = new GameResource('Resource 2', '200');

    component.playerOneResource = resource1;
    component.playerTwoResource = resource2;

    component['chooseWinner']();

    expect(component.winner).toBe(resource2);
    expect(component.gameScore.playerTwoScore).toBe(1);
  });

  it('should not increase score if there is no winner', () => {
    const resource1 = new GameResource('Resource 1', '100');
    const resource2 = new GameResource('Resource 2', '100');

    component.playerOneResource = resource1;
    component.playerTwoResource = resource2;

    component['chooseWinner']();

    expect(component.winner).toBeUndefined();
    expect(component.gameScore.playerOneScore).toBe(0);
    expect(component.gameScore.playerTwoScore).toBe(0);
  });
});
