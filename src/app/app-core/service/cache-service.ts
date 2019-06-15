import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheService {
  private cache: { [id: string]: any; };

  constructor() {
    this.cache = {};
  }

  protected cacheContainsKey(key: string): boolean {
    let valret = true;
    if (this.cache[key] === undefined) {
      valret = false;
    }
    return valret;
  }

  protected putCacheValue(key: string, value: object): object {
    this.cache[key] = value;
    return value;
  }

  protected getCacheValue(key: string): Observable<object> {
    return of(this.cache[key]);
  }
}
