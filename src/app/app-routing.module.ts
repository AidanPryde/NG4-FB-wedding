import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { JoiningComponent } from './joining/joining.component';
import { GiftComponent } from './gift/gift.component';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',    component: HomeComponent },
  { path: 'joining', component: JoiningComponent, canActivate: [AuthGuard] },
  { path: 'gift',    component: GiftComponent,    canActivate: [AuthGuard] },
  { path: 'signup',  component: SignupComponent },
  { path: 'login',   component: LoginComponent },
  { path: 'logout',  component: LogoutComponent,  canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
