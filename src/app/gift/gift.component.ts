import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../app-routing.animation';

@Component({
    selector: 'app-gift',
    templateUrl: './gift.component.html',
    styleUrls: ['./gift.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class GiftComponent implements OnInit {
  state: '';

  constructor(public afd: AngularFireDatabase, public afa: AngularFireAuth) {
      // afd.list('/user/' + this.afa.auth.currentUser.uid + '/guest').subscribe(data => {
      // this.guests = data;
    // });
  }

  ngOnInit() {
  }
}
