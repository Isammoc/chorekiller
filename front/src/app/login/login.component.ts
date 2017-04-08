import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginDialogComponent } from './login.dialog';

@Component({
    selector: 'ck-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    constructor(private _dialog: MdDialog) {}

    openDialog() {
        this._dialog.open(LoginDialogComponent);
    }
}
