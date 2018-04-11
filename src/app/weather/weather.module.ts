import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardComponent } from './card/card.component';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [
    CardComponent,
  ],
  exports: [
    CardComponent,
  ],
  providers: [
    WeatherService,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
})
export class WeatherModule { }
