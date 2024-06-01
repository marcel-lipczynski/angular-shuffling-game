import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { BASE_URL } from '../configs/base-url.injection-token';

@Injectable({
  providedIn: 'root',
})
export class StarWarsUniverseService {
  constructor(
    @Inject(BASE_URL) baseUrl: string,
    private http: HttpClient,
  ) {
    console.log(baseUrl, http);
  }
}
