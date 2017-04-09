import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { User } from './user';

@Injectable()
export class UserService {
  private baseUrl: '/api/users';
  private userObs: Observable<User>;
  private userSubscribers: Subscriber<User>;

  constructor(private http: Http) {
    if (!this.userObs) {
      this.userObs = new Observable<User>(observers => this.userSubscribers = observers)
        .share();
    }
  }

  get user() {
    return this.userObs;
  }

  login(login: string, passwd: string) {
    return new Observable<User>(observer => {
      if (login === 'admin' && passwd === 'changeit') {
        const user = {login: 'admin', displayName: 'Administrateurr'} as User;
        this.setUser(user);
        observer.next(user);
      } else {
        observer.error(400);
        this.setUser(null);
      }
    });
  }

  private setUser(user: User) {
    this.userSubscribers.next(user);
  }

  logout() {
    this.setUser(null);
  }
}
