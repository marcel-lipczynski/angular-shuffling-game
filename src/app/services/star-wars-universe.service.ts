import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// eslint-disable-next-line import/namespace
import { Observable } from 'rxjs';

import { BASE_URL } from '../configs/base-url.injection-token';
import {
  DetailedResponse,
  ListResponse,
} from '../models/api-response.interface';
import { PersonDetailed, PersonMinimal } from '../models/person.interface';
import {
  StarshipDetailed,
  StarshipMinimal,
} from '../models/starship.interface';

@Injectable({
  providedIn: 'root',
})
export class StarWarsUniverseService {
  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: HttpClient,
  ) {}

  public getPeopleList(
    page = 1,
    limit = 100,
  ): Observable<ListResponse<PersonMinimal>> {
    return this.http.get<ListResponse<PersonMinimal>>(
      `${this.baseUrl}/people?page=${page}&limit=${limit}}`,
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
    limit = 100,
  ): Observable<ListResponse<StarshipMinimal>> {
    return this.http.get<ListResponse<StarshipMinimal>>(
      `${this.baseUrl}/starships?page=${page}&limit=${limit}}`,
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
