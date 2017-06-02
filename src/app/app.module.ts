import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

import { AngularFireModule } from "angularfire2";

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDLg0xub1SZm8j6FGN90RwHUEj-EwJCTHk",
  authDomain: "fir-1c48d.firebaseapp.com",
  databaseURL: "https://fir-1c48d.firebaseio.com",
  projectId: "fir-1c48d",
  storageBucket: "fir-1c48d.appspot.com",
  messagingSenderId: "340404121317"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
