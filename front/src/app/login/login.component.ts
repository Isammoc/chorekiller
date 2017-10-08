import { Component } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LoginDialogComponent } from './login.dialog';

import { UserService } from '../service/user/user.service';

import { User } from '../service/user/user';

@Component({
    selector: 'ck-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
  user: User;

  constructor(
    private dialog: MdDialog,
    private userService: UserService,
    private router: Router,
    private snackBar: MdSnackBar,
  ) {
    userService.user().subscribe(user => this.user = user);
  }

  openDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
      this.userService.logout();
      this.snackBar.open('Déconnecté');
  }

  gotoProfile(): void {
    this.router.navigate(['/users', this.user.login]);
  }
}
