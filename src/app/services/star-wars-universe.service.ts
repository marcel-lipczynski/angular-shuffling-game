import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// eslint-disable-next-line import/namespace
import { Observable } from 'rxjs';

import { BASE_URL } from '../configs/base-url.injection-token';
import {
  DetailedResponse,
  ListResponse,
} from '../models/api-response.interface';
import { PersonDetailed } from '../models/person.interface';
import { StarshipDetailed } from '../models/starship.interface';

@Injectable({
  providedIn: 'root',
})
export class StarWarsUniverseService {
  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: HttpClient,
  ) {}

  public getPeopleList(page = 1): Observable<ListResponse<PersonDetailed>> {
    return this.http.get<ListResponse<PersonDetailed>>(
      `${this.baseUrl}/people/?page=${page}`,
    );
  }

  public getPersonDetails(
    personId: string,
  ): Observable<DetailedResponse<PersonDetailed>> {
    return this.http.get<DetailedResponse<PersonDetailed>>(
      `${this.baseUrl}/people/${personId}`,
    );
  }

  public getStarshipsList(
    page = 1,
  ): Observable<ListResponse<StarshipDetailed>> {
    return this.http.get<ListResponse<StarshipDetailed>>(
      `${this.baseUrl}/starships/?page=${page}`,
    );
  }

  public getStarshipDetails(
    starshipId: string,
  ): Observable<DetailedResponse<StarshipDetailed>> {
    return this.http.get<DetailedResponse<StarshipDetailed>>(
      `${this.baseUrl}/starships/${starshipId}`,
    );
  }
}
