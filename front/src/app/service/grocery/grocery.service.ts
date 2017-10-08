import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';


import { UserService } from '../user/user.service';
import { ChorekillerClient } from '../../shared/chorekiller-client/chorekiller-client';

import { GroceryItem } from './grocery-item';

@Injectable()
export class GroceryService {
  private groceriesSubject = new ReplaySubject<GroceryItem[]>();

  constructor(private client: ChorekillerClient, private userService: UserService) {
    this.refresh();
  }

  get items(): Observable<GroceryItem[]> {
    return this.groceriesSubject.asObservable();
  }

  addItem(name: string) {
    this.client.addItem(this.userService.token, name).subscribe(_ => this.refresh());
  }

  removeItem(item: GroceryItem) {
    this.client.deleteItem(this.userService.token, item.id).subscribe(_ => this.refresh());
  }

  toggleCompleted(item: GroceryItem) {
    (item.completed
      ? this.client.uncomplete(this.userService.token, item.id)
      : this.client.complete(this.userService.token, item.id)
    ).subscribe(_ => this.refresh());
  }

  private refresh() {
    this.client.items(this.userService.token).subscribe(res =>
      this.groceriesSubject.next(res.json().groceries as GroceryItem[])
    );
  }
}
