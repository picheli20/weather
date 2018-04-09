import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { WeatherModule } from './weather/weather.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    WeatherModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
