import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { GroceryService } from '../service/grocery/grocery.service';

import { GroceryItem } from '../service/grocery/grocery-item';

@Component({
  selector: 'ck-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss'],
})
export class GroceryListComponent implements OnInit, OnDestroy {
  items: GroceryItem[];

  newItemForm: FormGroup;

  private itemsSubscription: Subscription;

  constructor(private fb: FormBuilder, private groceryService: GroceryService) {
    this.newItemForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  toggleComplete(item: GroceryItem) {
    this.groceryService.toggleCompleted(item);
  }

  addItem() {
    this.groceryService.addItem(this.newItemForm.value.name);
    this.newItemForm.reset();
  }

  delete(item: GroceryItem) {
    this.groceryService.removeItem(item);
  }


  ngOnInit() {
    this.itemsSubscription = this.groceryService.items.subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
}
