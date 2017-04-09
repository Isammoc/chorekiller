import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
  private token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    this.token = localStorage.getItem('token');
    this.userObs = new Observable<User>(observers => {
      this.userSubscribers = observers;
      if (this.token) {
        const headers = new Headers();
        headers.append('Authorization', this.token);
        this.http.get(this.baseUrl + '/me', {headers: headers}).subscribe(res => {
            this.setUser(res.json() as User);
          }
        );
      }
    }).share();
  }

  get user() {
    return this.userObs;
  }

  login(login: string, passwd: string) {
    const request = this.http
        .post(this.baseUrl + '/me', {login: login, password: passwd})
        .map((res: Response) => {
          this.token = res.headers.get('Authorization');
          localStorage.setItem('token', this.token);
          return res.json() as User;
        }).share();
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
    this.token = null;
    localStorage.removeItem('token');
  }
}
