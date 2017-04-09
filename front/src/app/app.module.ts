import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { ConfigService } from './service/config/config.service';
import { UserService } from './service/user/user.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RibbonComponent } from './ribbon/ribbon.component';

import { LoginDialogComponent } from './login/login.dialog';

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
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
