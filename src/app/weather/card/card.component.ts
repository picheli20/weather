import { Component, Input } from '@angular/core';

import { IWeather } from '../weather.interface';

@Component({
  selector: 'ca-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() data: IWeather;
  @Input() showHumidity: boolean;
  @Input() showPressure: boolean;
}
