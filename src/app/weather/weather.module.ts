import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { WeatherService } from './weather.service';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    CardComponent,
  ],
  exports: [
    CardComponent,
  ],
  providers: [
    WeatherService
  ],
  imports: [
    HttpClientModule,
    CommonModule,
  ],
})
export class WeatherModule { }
