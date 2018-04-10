import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { IWeather } from '../weather.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ CardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('data()', () => {
    it('should set round the temp and the pressure', () => {
      component.data = {
        main: {
          temp: 10.9,
          pressure: 1.4,
        },
      } as IWeather;
      expect(component.data.main.temp).toBe(11);
      expect(component.data.main.pressure).toBe(1);
    });
  });
});
