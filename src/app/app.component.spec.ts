import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { AppComponent } from './app.component';
import { WeatherService } from './weather/weather.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ AppComponent ],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            load: () => of({}),
          },
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('.loadWeather()', () => {
    it(`should call the weatherService.load()`,
      inject([WeatherService], (service: WeatherService) => {
        const spy = spyOn(service, 'load').and.callFake(() => of());
        component.loadWeather(true);
        expect(spy).toHaveBeenCalled();
      }),
    );

    it(`should set loading to false`,
      fakeAsync(inject([WeatherService], (service: WeatherService) => {
        spyOn(service, 'load').and.callFake(() => of());
        component.loading = true;
        component.loadWeather(true).subscribe();
        tick();
        expect(component.loading).toBe(false);
      }),
    ));
  });
});
