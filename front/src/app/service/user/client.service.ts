import { Injectable } from '@angular/core';
import { Http, Response, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Injectable()
export class ClientService extends Http implements AuthenticationService {
  private baseUrl = '/api/users';
  private userObs: Observable<User>;
  private userSubscribers: Subscriber<User>;
  private token: string;

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);

    // set token if saved in local storage
    this.token = localStorage.getItem('token');
    this.userObs = new Observable<User>(observers => {
      this.userSubscribers = observers;
      if (this.token) {
        this.get(this.baseUrl + '/me').subscribe(res => {
            this.setUser(res.json() as User);
          }
        );
      }
    }).share();
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', this.token);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', this.token);
    }
    return super.request(url, options);
  }


  user() {
    return this.userObs;
  }

  login(login: string, passwd: string) {
    const request = super.post(this.baseUrl + '/me', {login: login, password: passwd})
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
