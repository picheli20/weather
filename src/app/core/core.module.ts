import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';

import { CacheService } from './cache.service';
import { ENVIRONMENT } from './environment.token';

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
