import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { User } from './user';

@Injectable()
export class UserService {
  private baseUrl = '/api/users';
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
    const request = this.http
        .post(this.baseUrl + '/me', {login: login, password: passwd})
        .map(res => res.json() as User);

    request.subscribe(
      user => this.setUser(user),
      err => this.setUser(null)
    );

    return request;
  }

  private setUser(user: User) {
    this.userSubscribers.next(user);
  }

  logout() {
    this.setUser(null);
  }
}
