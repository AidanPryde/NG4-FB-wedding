import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../app-routing.animation';

import { Observable } from 'rxjs/Observable';

class Guest {
  $key: string;

  constructor(
    public name: string,
    public isChild: boolean,
    public broughtBy: string,
    public uid: string
  ) { }
}

@Component({
    selector: 'app-joining',
    templateUrl: './joining.component.html',
    styleUrls: ['./joining.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class JoiningComponent implements OnInit {
  guestCount: number;
  guests: Guest[];
  error;
  state: '';
  savebuttoncolor = 'green';
  savebuttontext = 'Lista elmentve';

  constructor(public afd: AngularFireDatabase, public afa: AngularFireAuth) {
    afd.list('/user/' + this.afa.auth.currentUser.uid + '/guest').subscribe(data => {
      this.guests = data;
    });
  }

  generateGuests() {
    if (this.guestCount === undefined || this.guestCount == null || this.guestCount < 0) {
      this.guestCount = 1;
    }
    for (let index = 0; index < this.guestCount; index++) {
      this.afd.list('/user/' + this.afa.auth.currentUser.uid + '/guest').push(
        new Guest(
          '',
          false,
          this.afa.auth.currentUser.displayName,
          this.afa.auth.currentUser.uid
        )
      );
    }
  }

  removeGuest(data) {
    this.afd.list('/user/' + this.afa.auth.currentUser.uid + '/guest').remove(data);
  }

  saveGuests() {
    this.guests.forEach(guest => {
      console.log(guest);
      this.afd.list('/user/' + this.afa.auth.currentUser.uid + '/guest')
      .update(guest.$key, guest)
      .then(() => {
        this.savebuttoncolor = 'green';
        this.savebuttontext = 'Lista elmentve';
      })
      .catch((err) => {
        this.error = err;
      });
    });
  }

  inputChanged($event) {
    this.savebuttoncolor = 'red';
    this.savebuttontext = 'Ha végesztél mentsd el a munkádat';
  }

  ngOnInit() {
  }
}
