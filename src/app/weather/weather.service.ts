import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { IWeatherResp, IWeather } from './weather.interface';

@Injectable()
export class WeatherService {
  private APPID = 'e41461f4abde3ad00782aba29fc8f8eb';
  constructor(private http: HttpClient) { }

  load(cities: string[]) {
    return this.http.get<IWeatherResp>(
      `http://api.openweathermap.org/data/2.5/group?id=${cities.join(',')}&APPID=${this.APPID}&units=metric`,
      ).pipe(
        map((data: IWeatherResp) => {
          data.list.map(item => item.updated = (new Date()).getTime());
          return data.list;
        }),
      );
  }
}
