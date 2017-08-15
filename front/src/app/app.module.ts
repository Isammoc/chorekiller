import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { ChorekillerClient } from './shared/chorekiller-client/chorekiller-client';

import { ConfigService } from './service/config/config.service';
import { UserService } from './service/user/user.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PasswordChangeComponent } from './profile/password-change/password-change-component';
import { ProfileComponent } from './profile/profile.component';
import { RibbonComponent } from './ribbon/ribbon.component';

import { LoginDialogComponent } from './login/login.dialog';

import { UnderConstructionComponent } from './under-construction/under-construction.component';

const appRoutes: Routes = [
  { path: '', component: UnderConstructionComponent },
  { path: 'users/:login', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    NotFoundComponent,
    PasswordChangeComponent,
    ProfileComponent,
    RibbonComponent,
    LoginDialogComponent,
    UnderConstructionComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ChorekillerClient,
    ConfigService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
