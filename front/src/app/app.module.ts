import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { ConfigService } from './service/config/config.service';
import { AuthenticationService } from './service/user/authentication.service';
import { ClientService } from './service/user/client.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RibbonComponent } from './ribbon/ribbon.component';

import { LoginDialogComponent } from './login/login.dialog';

export function clientFactory(backend: XHRBackend, options: RequestOptions) {
  return new ClientService(backend, options);
}


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RibbonComponent,
    LoginDialogComponent,
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
