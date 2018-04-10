import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, mergeAll, finalize } from 'rxjs/operators';
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
  private subscriptions = new Subscription();
  loading = false;
  list;

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.loading = true;

    const timerSubscription = timer(0, this.weatherService.MAX_AGE).pipe(
        map(count => this.loadWeather(count !== 0)),
        mergeAll(),
      ).subscribe(
        data => this.list = data,
        console.log,
      );

    this.subscriptions.add(timerSubscription);
  }

  // ¯\_(ツ)_/¯ https://github.com/ReactiveX/rxjs/issues/1791
  loadWeather(force: boolean) {
    return this.weatherService.load([`3421319`, `3445709`, `184745`], force).pipe(finalize(() => this.loading = false));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
