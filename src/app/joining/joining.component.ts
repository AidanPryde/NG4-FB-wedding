import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../app-routing.animation';

class Guest {
  $key: string;

  constructor(
    public name: string,
    public isChild: boolean
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
  error: Error;
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
    if (this.guestCount > 10) {
      this.guestCount = 10;
      this.error = new Error('Egyszerre csak maximum 10-et hozz létre.');
    }
    for (let index = 0; index < this.guestCount; index++) {
      this.afd.list('/user/' + this.afa.auth.currentUser.uid + '/guest')
      .push(
        new Guest(
          '',
          false
        )
      )
      .then(() => {})
      .catch((err) => {
        this.error = err;
      });
    }
  }

  removeGuest(data) {
    this.afd.list('/user/' + this.afa.auth.currentUser.uid + '/guest')
    .remove(data)
    .then(() => {})
    .catch((err) => {
      this.error = err;
    });
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
    this.savebuttontext = 'Ha végeztél mentsd el a munkádat';
  }

  ngOnInit() {
  }
}
