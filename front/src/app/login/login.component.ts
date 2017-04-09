import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginDialogComponent } from './login.dialog';

import { UserService } from '../service/user/user.service';

import { User } from '../service/user/user';

@Component({
    selector: 'ck-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
  user: User;

  constructor(private dialog: MdDialog, private userService: UserService) {
    userService.user.subscribe(user => this.user = user);
  }

  openDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
      this.userService.logout();
  }
}
