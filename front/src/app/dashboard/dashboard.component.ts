import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../service/user/user.service';

import { User } from '../service/user/user';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User;
  private userSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSubscription = this.userService.user().subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
