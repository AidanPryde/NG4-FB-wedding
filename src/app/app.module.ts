import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }     from './app.component';
import { HomeComponent }    from "./home/home.component";
import { JoiningComponent } from './joining/joining.component';
import { GiftComponent }    from './gift/gift.component';
import { AppRoutingModule } from './app.routes.module';

import { AuthGuard }        from './services/auth.service';
import { SignupComponent }  from './signup/signup.component';
import { LoginComponent }   from './login/login.component';
import { LogoutComponent }  from './logout/logout.component';

import { AngularFireModule } from "angularfire2";


import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBMMygqHCU3ITa6fhpNgymEC8XXLxBP5FQ",
  authDomain: "wp-wedding-e9dbe.firebaseapp.com",
  databaseURL: "https://wp-wedding-e9dbe.firebaseio.com",
  projectId: "wp-wedding-e9dbe",
  storageBucket: "wp-wedding-e9dbe.appspot.com",
  messagingSenderId: "132706772677"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoiningComponent,
    GiftComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [ AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
