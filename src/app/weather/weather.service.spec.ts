import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';

import { WeatherService } from './weather.service';
import { CacheService } from '../core/cache.service';
import { ENVIRONMENT, EnvConfig } from '../core/environment.token';
import { SSL_OP_NO_QUERY_MTU } from 'constants';
import { IWeatherResp } from './weather.interface';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        {
          provide: CacheService,
          useValue: {
            get: () => of({
              list: [{ test: 1 }],
            }),
          },
        },
        {
          provide: HttpClient,
          useValue: {
            get: () => of({}),
          }
        },
        {
          provide: ENVIRONMENT,
          useValue: {
            api: {
              url: 'http://google.com/',
              token: '123',
              unit: 'metric',
            },
          }
        },
      ],
    });
  });

  describe('.load()', () => {
    it(`should return just the listed array`,
      fakeAsync(inject([WeatherService], (service: WeatherService) => {
        let result = [];
        const subscription = service.load(['123']).subscribe(data => result = data);

        tick();
        expect(result.length).toEqual(1);

        subscription.unsubscribe();
      }),
    ));

    it(`should call .load() with the proper attributes`,
      fakeAsync(inject([WeatherService, CacheService, HttpClient], (service: WeatherService, cache: CacheService, http: HttpClient) => {
        const spy = spyOn(cache, 'get').and.callFake(() => of({}));
        const subscription = service.load(['123']).subscribe();
        tick();
        expect(cache.get).toHaveBeenCalledWith(
          'city-group',
          jasmine.any(Object),
          600000,
          false,
        );

        subscription.unsubscribe();
      }),
    ));

    it(`should build the correct url`,
      fakeAsync(inject([WeatherService, HttpClient], (service: WeatherService, http: HttpClient) => {
        spyOn(http, 'get').and.callFake(() => of({}));
        const subscription = service.load(['123']).subscribe();
        tick();
        expect(http.get).toHaveBeenCalledWith(`http://google.com/group?id=123&APPID=123&units=metric`);

        subscription.unsubscribe();
      }),
    ));

    it(`should add the .updated attribute`,
      fakeAsync(inject([WeatherService, CacheService, HttpClient], (service: WeatherService, cache: CacheService, http: HttpClient) => {
        let result: IWeatherResp;
        const cacheSpy = spyOn(cache, 'get').and.callFake(() => of());
        spyOn(http, 'get').and.callFake(() => of({ list: [{}] }));
        service.load(['123']);
        const subscription = cacheSpy.calls.mostRecent().args[1].subscribe((data: IWeatherResp) => result = data);

        tick();
        expect(result.list[0].updated).toBeDefined();

        subscription.unsubscribe();
      }),
    ));
  });
});
