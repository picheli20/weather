import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { Subject } from 'rxjs/Subject';

interface CacheContent {
  expiry: number;
  value: any;
}

/**
 * Cache Service is an observables based in-memory cache implementation
 * Keeps track of in-flight observables and sets a default expiry for cached values
 * https://hackernoon.com/angular-simple-in-memory-cache-service-on-the-ui-with-rxjs-77f167387e39
 * @export
 * @class CacheService
 */
@Injectable()
export class CacheService {
  readonly DEFAULT_MAX_AGE: number = 10 * 60 * 1000; // 10 min

  /**
   * Gets the value from cache if the key is provided.
   */
  get(key: string, fallback: Observable<any>, maxAge?: number, force: boolean = false): Observable<any> | Subject<any> {
    if (this.hasValidCachedValue(key) && !force) {
      const cache: CacheContent = JSON.parse(localStorage.getItem(key));
      return of(cache.value);
    }

    return fallback.pipe(
      tap((value) => { this.set(key, value, maxAge); }),
    );
  }

  /**
   * Sets the value with key in the cache
   */
  set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
    const expiry = Date.now() + maxAge;
    localStorage.setItem(key, JSON.stringify({ value, expiry }));
  }

  /**
   * Checks if the key exists and is not expired.
   */
  private hasValidCachedValue(key: string): boolean {
    const cache: CacheContent = JSON.parse(localStorage.getItem(key));
    return cache !== null && cache.expiry > Date.now();
  }
}
