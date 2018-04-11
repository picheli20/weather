import { Component, Input } from '@angular/core';

import { IWeather } from '../weather.interface';

import { animations } from './card.animation';

@Component({
  selector: 'ca-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations,
})
export class CardComponent {
  private _data: IWeather;
  @Input()
  set data(value: IWeather) {
    value.main.temp = Math.round(value.main.temp);
    value.main.pressure = Math.round(value.main.pressure);
    this._data = value;
  }

  get data() {
    return this._data;
  }

  @Input() showHumidity: boolean;
  @Input() showPressure: boolean;
}
