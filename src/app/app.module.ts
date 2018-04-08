import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LayoutModule } from './layout/layout.module';
import { CardModule } from './card/card.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
