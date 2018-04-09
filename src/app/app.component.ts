import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, mergeAll } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';

import { WeatherService } from './weather/weather.service';
import { IWeather } from './weather/weather.interface';


@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  loading = false;

  list;
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

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.loading = true;
    const timerSubscription = timer(0, 10 * 60 * 1000)
      .pipe(
        map(() => this.list$),
        mergeAll(),
      ).subscribe(
        (data) => {
          this.loading = false;
          this.list = data;
        },
        console.log);

    this.subscriptions.add(timerSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
