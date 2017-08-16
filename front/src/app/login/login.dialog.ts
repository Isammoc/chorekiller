import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MdSnackBar } from '@angular/material';

import { UserService } from '../service/user/user.service';

@Component({
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss'],
})
export class LoginDialogComponent {
  myForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MdDialogRef<LoginDialogComponent>,
    private snackBar: MdSnackBar
  ) {
    this.buildForm();
  }

  buildForm() {
    this.myForm = this.fb.group({
      'login': ['', Validators.required],
      'passwd': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(form: any) {
    if (this.myForm.invalid) {
      console.error('Comment est-ce possible?');
    } else {
      this.userService.login(form.login, form.passwd).subscribe(
        user => {
          this.dialog.close();
          this.snackBar.open("Connexion réussie", null, {
            duration: 3000
          });
        },
        error => {
          this.snackBar.open("Connexion échouée", null, {
            duration: 5000
          });
          this.buildForm();
        },
      );
    }
  }
}
