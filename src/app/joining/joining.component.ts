import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../app.routes.animations';

@Component({
    selector: 'app-joining',
    templateUrl: './joining.component.html',
    styleUrls: ['./joining.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class JoiningComponent implements OnInit {
  name: any;
  state: string = '';

  constructor(public af: AngularFireAuth, private router: Router) {
      if(this.af.auth.currentUser) {
        this.name = this.af.auth.currentUser.displayName;
      }
  }

  ngOnInit() {
  }
}