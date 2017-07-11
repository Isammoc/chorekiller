import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ck-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private login: string;

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => this.login = params.get('login'));
  }
}
