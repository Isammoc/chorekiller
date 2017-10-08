import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { UserService } from '../user/user.service';
import { ChorekillerClient } from '../../shared/chorekiller-client/chorekiller-client';

import { GroceryItem } from './grocery-item';

@Injectable()
export class GroceryService {
  private _items: GroceryItem[];
  private groceriesSubject = new BehaviorSubject<GroceryItem[]>(this._items);
  private currentId = 4;

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
    this._items = this._items.map(i => {
      if(i.id === item.id) {
        i.completed = !i.completed;
      }
      return i;
    });
    this.groceriesSubject.next(this._items);
  }

  private refresh() {
    this.client.items(this.userService.token).subscribe(res =>
      this.groceriesSubject.next(res.json().groceries as GroceryItem[])
    );
  }
}
