import { Component } from '@angular/core';

import { WeatherService } from './weather/weather.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list$ = this.weatherService.load([`3421319`, `3445709`, `184745`])
    .pipe(
      map(data => {
        data.map(item => {
          item.main.temp = Math.round(item.main.temp);
          item.main.pressure = Math.round(item.main.pressure);
        });
        return data;
      }),
    );

  constructor(public weatherService: WeatherService) {}
}
