import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { UserService } from '../user/user.service';
import { ChorekillerClient } from '../../shared/chorekiller-client/chorekiller-client';

import { GroceryItem } from './grocery-item';

@Injectable()
export class GroceryService {
  private _items: GroceryItem[] = [
    {id: 1, name: 'Lait', completed: true},
    {id: 2, name: 'Oeufs', completed: false},
    {id: 3, name: 'Gruyère', completed: true},
  ];
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
    this._items = this._items.filter(i => i.id !== item.id);
    this.groceriesSubject.next(this._items);
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
