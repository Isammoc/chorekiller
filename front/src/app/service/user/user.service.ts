import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { User } from './user';

@Injectable()
export class UserService {
  baseUrl: '/api/users';

  constructor(private http: Http) {}

  login(login: string, passwd: string) {
    return new Observable<User>(observer => {
      if (login === 'admin' && passwd === 'changeit') {
        observer.next({login: 'admin', displayName: 'Administrateurr'});
      } else {
        observer.error(400);
      }
    });
  }
}
