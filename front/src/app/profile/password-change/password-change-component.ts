import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { UserService } from '../../service/user/user.service';
import { User } from '../../service/user/user';

import { CkValidator } from '../../shared/custom-validator';

@Component({
  selector: 'ck-password-change',
  templateUrl: './password-change.component.html'
})
export class PasswordChangeComponent {
  @Input() user: User;
  myForm: FormGroup;

  constructor(private userService: UserService, fb: FormBuilder, private snackBar: MdSnackBar) {
    this.myForm = fb.group({
      'oldPassword': ['', [Validators.required, Validators.minLength(6)]],
      'password': ['', [Validators.required, Validators.minLength(6), CkValidator.different('oldPassword')]],
      'confirmation': ['', [Validators.required, CkValidator.same('password')]],
    });
  }

  submit() {
    if (this.myForm.invalid) {
      this.snackBar.open("Dites moi : Comment avez-vous fait ?");
      console.error('Comment est-ce possible?');
      console.error(this.myForm.errors);
    } else {
      const form = this.myForm.value
      this.userService.changePassword(form.oldPassword, form.password).subscribe(
        ok => {
          this.snackBar.open("Mot de passe modifié", null, {
            duration: 3000
          });
          this.myForm.reset();
        },
        error => {
          this.snackBar.open("Impossible de modifier le mot de passe, avez-vous oublié votre mot de passe actuel ?", null, {
            duration: 3000
          });
          this.myForm.reset();
        },
      );
    }
  }
}
