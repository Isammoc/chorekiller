import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { ConfigService } from './service/config/config.service';
import { AuthenticationService } from './service/user/authentication.service';
import { ClientService } from './service/user/client.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RibbonComponent } from './ribbon/ribbon.component';

import { LoginDialogComponent } from './login/login.dialog';

import { UnderConstructionComponent } from './under-construction/under-construction.component';

export function clientFactory(backend: XHRBackend, options: RequestOptions) {
  return new ClientService(backend, options);
}

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
    ConfigService,
    {
      provide: ClientService,
      useFactory: clientFactory,
      deps: [XHRBackend, RequestOptions]
    },
    {provide: Http, useExisting: ClientService},
    {provide: AuthenticationService, useExisting: ClientService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
