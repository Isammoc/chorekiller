import { Injectable } from '@angular/core';
import { Http, Response, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { ChorekillerClient } from '../../shared/chorekiller-client/chorekiller-client';
import { User } from './user';

@Injectable()
export class UserService {
  private baseUrl = '/api/users';
  private userObs: Observable<User>;
  private userSubscribers: Subscriber<User>;
  private _token: string;

  constructor(private client: ChorekillerClient) {
    // set token if saved in local storage
    this._token = localStorage.getItem('token');
    console.log('loading with token = ');
    console.log(this._token);
    this.userObs = new Observable<User>(observers => {
      this.userSubscribers = observers;
      if (this._token) {
        this.client.connectedUser(this._token)
            .subscribe((user: User) => this.setUser(user));
      }
    }).share();
  }

  user() {
    return this.userObs;
  }

  login(login: string, passwd: string) {
    const request = this.client.login(login, passwd)
        .map((res: Response) => {
          this._token = res.headers.get('Set-Authorization');
          localStorage.setItem('token', this._token);
          console.log('Store');
          console.log(this._token);
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
    this._token = null;
    localStorage.removeItem('token');
  }

  get token() {
    return this._token;
  }
}
