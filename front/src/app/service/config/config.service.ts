import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Config } from './config';

@Injectable()
export class ConfigService {
  private configObsv: Observable<Config>;

  constructor(public http: Http) { }

  observeConfig(): Observable<Config> {
    if (!this.configObsv) {
      this.configObsv = this.http.get('/api/config')
        .map((res) => res.json())
        .share();
    }
    return this.configObsv;
  }
}
