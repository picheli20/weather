import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CacheService,
      ],
    });
    localStorage.removeItem('test');
  });

  describe('.get()', () => {
    it(`should return the saved cache`,
      fakeAsync(inject([CacheService], (service: CacheService) => {
        let result;
        service.set('test', 123);
        service.get('test', of({ test: 1 })).subscribe(data => result = data);
        tick();
        expect(result).toBe(123);
      }),
    ));
    it(`should return the not saved`,
      fakeAsync(inject([CacheService], (service: CacheService) => {
        let result;
        service.set('test', 123, -100);
        service.get('test', of({ test: 1 })).subscribe(data => result = data);
        tick();
        expect(result).toEqual({ test: 1 });
      }),
    ));
    it(`should force the request`,
      fakeAsync(inject([CacheService], (service: CacheService) => {
        let result;
        service.set('test', 123);
        service.get('test', of({ test: 1 }), 1000, true).subscribe(data => result = data);
        tick();
        expect(result).toEqual({ test: 1 });
      }),
    ));
  });

  describe('.set()', () => {

    it(`should set the item on the localstorage`,
      fakeAsync(inject([CacheService], (service: CacheService) => {
        const spy = spyOn(localStorage, 'setItem');
        spyOn(Date, 'now').and.callFake(() => new Date('01/01/2000').getTime());
        service.set('test', 123, 200);
        expect(spy).toHaveBeenCalledWith('test', '{"value":123,"expiry":946692000200}');
      }),
    ));

    it(`should set the item on the localstorage with the default expiry`,
      fakeAsync(inject([CacheService], (service: CacheService) => {
        const spy = spyOn(localStorage, 'setItem');
        spyOn(Date, 'now').and.callFake(() => new Date('01/01/2000').getTime());
        service.set('test', 123);
        expect(spy).toHaveBeenCalledWith('test', '{"value":123,"expiry":946692600000}');
      }),
    ));
  });
});
