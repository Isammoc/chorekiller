import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss'],
})
export class LoginDialogComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MdDialogRef<LoginDialogComponent>) {
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
      if (form.login === 'admin' && form.passwd === 'changeit') {
        // Connected
        this.dialog.close();
      } else {
        console.error('Unknown user');
        this.buildForm();
      }
    }
  }
}
