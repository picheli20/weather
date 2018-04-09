import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
  ],
  providers: [],
})
export class LayoutModule { }
