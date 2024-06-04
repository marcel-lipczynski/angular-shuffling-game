import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// eslint-disable-next-line import/namespace
import { Observable } from 'rxjs';

import { BASE_URL } from '../configs/base-url.injection-token';
import {
  DetailedResponse,
  ListResponse,
} from '../models/api-response.interface';
import { Person } from '../models/person.interface';
import { Starship } from '../models/starship.interface';

@Injectable({
  providedIn: 'root',
})
export class StarWarsUniverseService {
  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: HttpClient,
  ) {}

  public getPeopleList(page = 1): Observable<ListResponse<Person>> {
    return this.http.get<ListResponse<Person>>(
      `${this.baseUrl}/people/?page=${page}`,
    );
  }

  public getPersonDetails(
    personId: string,
  ): Observable<DetailedResponse<Person>> {
    return this.http.get<DetailedResponse<Person>>(
      `${this.baseUrl}/people/${personId}`,
    );
  }

  public getStarshipsList(page = 1): Observable<ListResponse<Starship>> {
    return this.http.get<ListResponse<Starship>>(
      `${this.baseUrl}/starships/?page=${page}`,
    );
  }

  public getStarshipDetails(
    starshipId: string,
  ): Observable<DetailedResponse<Starship>> {
    return this.http.get<DetailedResponse<Starship>>(
      `${this.baseUrl}/starships/${starshipId}`,
    );
  }
}
