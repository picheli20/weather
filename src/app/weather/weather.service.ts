import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { IWeatherResp, IWeather } from './weather.interface';
import { ENVIRONMENT, EnvConfig } from '../core/environment.token';
import { CacheService } from '../core/cache.service';

@Injectable()
export class WeatherService {
  private APPID = 'e41461f4abde3ad00782aba29fc8f8eb';
  private sufix = `&APPID=${this.env.api.token}&units=${this.env.api.unit}`;

  public MAX_AGE = 10 * 60 * 1000; // 10 min

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    @Inject(ENVIRONMENT) private env: EnvConfig,
  ) { }

  load(cities: string[], force: boolean = false) {
    return this.cacheService.get(
      'city-group',
      this.http.get<IWeatherResp>(`${this.env.api.url}group?id=${cities.join(',')}${this.sufix}`)
        .pipe(
          tap(({ list }: IWeatherResp) => list.map(item => item.updated = (new Date()).getTime())),
        ),
      this.MAX_AGE,
      force,
    ).pipe(
      map(({ list }: IWeatherResp) => list),
    );
  }
}
