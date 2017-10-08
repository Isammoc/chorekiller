import { Injectable } from '@angular/core';
import { Http, Response, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../../service/user/user';

@Injectable()
export class ChorekillerClient {
  private baseUrl = '/api';

  constructor(private http: Http) { }

  login(login: string, passwd: string): Observable<Response> {
    return this.http.post(this.baseUrl + '/users/me', { login: login, password: passwd });
  }

  connectedUser(token: string): Observable<User> {
    return this.http.get(this.baseUrl + '/users/me', {
      headers: new Headers({
        'Authorization': token
      })
    }).map((res: Response) => res.json() as User);
  }

  findUserByLogin(token: string, login: string): Observable<User> {
    return this.http.get(this.baseUrl + '/users/' + login, {
      headers: new Headers({
        'Authorization': token
      })
    }).map((res: Response) => res.json() as User)
  }

  changePassword(token: string, oldPassword: string, newPassword: string) {
    return this.http.post(this.baseUrl + '/users/me/password',
      {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, {
        headers: new Headers({
          'Authorization': token
        })
      }
    );
  }

  items(token: string) {
    return this.http.get(this.baseUrl + '/lists/1/items', {
      headers: new Headers({
        'Authorization': token
      })
    });
  }

  addItem(token: string, name: string) {
    return this.http.post(this.baseUrl + '/lists/1/items', {
      name: name
    }, {
        headers: new Headers({
          'Authorization': token
        })
      });
  }

  deleteItem(token: string, id: number) {
    return this.http.delete(this.baseUrl + '/lists/1/items/' + id, {
      headers: new Headers({
        'Authorization': token
      })
    });
  }

  complete(token: string, id: number) {
    return this.http.post(this.baseUrl + '/lists/1/items/' + id + '/completion', {}, {
      headers: new Headers({
        'Authorization': token
      })
    });
  }

  uncomplete(token: string, id: number) {
    return this.http.delete(this.baseUrl + '/lists/1/items/' + id + '/completion', {
      headers: new Headers({
        'Authorization': token
      })
    });
  }
}
