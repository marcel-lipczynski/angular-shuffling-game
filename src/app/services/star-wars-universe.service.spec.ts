import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StarWarsUniverseService } from './star-wars-universe.service';
import { BASE_URL } from '../configs/base-url.injection-token';

describe('StarWarsUniverseService', () => {
  let service: StarWarsUniverseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StarWarsUniverseService,
        {
          provide: BASE_URL,
          useValue: 'https://test-url/api',
        },
      ],
    });
    service = TestBed.inject(StarWarsUniverseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve people list from the API via GET', () => {
    const dummyPeopleList = [{ name: 'Luke Skywalker' }];
    service.getPeopleList().subscribe((peopleList) => {
      expect(peopleList).toEqual(dummyPeopleList);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/people/?page=1`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyPeopleList);
  });

  it('should retrieve person details from the API via GET', () => {
    const dummyPersonId = '1';
    const dummyPersonDetails = { name: 'Luke Skywalker' };
    service.getPersonDetails(dummyPersonId).subscribe((personDetails) => {
      expect(personDetails).toEqual(dummyPersonDetails);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/people/${dummyPersonId}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyPersonDetails);
  });

  it('should retrieve starships list from the API via GET', () => {
    const dummyStarshipsList = [{ name: 'X-wing' }];
    service.getStarshipsList().subscribe((starshipsList) => {
      expect(starshipsList).toEqual(dummyStarshipsList);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/starships/?page=1`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyStarshipsList);
  });

  it('should retrieve starship details from the API via GET', () => {
    const dummyStarshipId = '1';
    const dummyStarshipDetails = { name: 'X-wing' };
    service.getStarshipDetails(dummyStarshipId).subscribe((starshipDetails) => {
      expect(starshipDetails).toEqual(dummyStarshipDetails);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/starships/${dummyStarshipId}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyStarshipDetails);
  });
});
