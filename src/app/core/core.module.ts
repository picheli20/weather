import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ENVIRONMENT } from './environment.token';
import { environment } from '../../environments/environment';

import { CacheService } from './cache.service';

@NgModule({
  providers: [
    CacheService,
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  imports: [
    HttpClientModule,
    CommonModule,
  ],
})
export class CoreModule { }
