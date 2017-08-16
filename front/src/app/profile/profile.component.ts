import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChorekillerClient } from '../shared/chorekiller-client/chorekiller-client';

import { UserService } from '../service/user/user.service';

import { User } from '../service/user/user';

@Component({
  selector: 'ck-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private login: string;
  private user: User;
  private currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private client: ChorekillerClient,
    private userService: UserService,
    private router: Router,
  ) {
    this.userService.user().subscribe((user: User) => this.currentUser = user);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.login = params.get('login');
      this.client
          .findUserByLogin(this.userService.token, this.login)
          .subscribe(
            (user: User) => this.user = user,
            (err) => {
              console.log(err);
              if (404 === err.status) {
                console.log('Not found');
              }
              this.gotoHome();
            }
          );
    });
  }

  gotoHome(): void {
    this.router.navigate(['/']);
  }

}
