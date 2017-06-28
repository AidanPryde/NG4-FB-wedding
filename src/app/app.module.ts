import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JoiningComponent } from './joining/joining.component';
import { GiftComponent } from './gift/gift.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './services/auth-guard.service';
import { MyAuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDkQrxrutqgoCkIXjzTVXILc4-ML64OVTI",
  authDomain: "csenge-gergo.firebaseapp.com",
  databaseURL: "https://csenge-gergo.firebaseio.com",
  projectId: "csenge-gergo",
  storageBucket: "csenge-gergo.appspot.com",
  messagingSenderId: "250629012911"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoiningComponent,
    GiftComponent,
    ProfileComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ AuthGuard, MyAuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
