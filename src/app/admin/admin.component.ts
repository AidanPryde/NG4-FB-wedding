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

class Details {
  $key: string;

  constructor(
    public name: string,
    public email: string
  ) { }
}

class User {
  $key: string;

  constructor(
    public details: Details,
    public guests: Guest[]
  ) { }
}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})

export class AdminComponent implements OnInit {
    state: '';
    error: Error;

    users: User[] = [];

    constructor(public afd: AngularFireDatabase, public afa: AngularFireAuth) {
        afd
        .list('/user')
        .subscribe(data => {
            for (let index = 0; index < data.length; index += 1) {
                const guests: Guest[] = [];
                let detail: Details = new Details('<Üres>', '<Nincs>');
                if (data[index].guest) {
                    const guestKeys = Object.keys(data[index].guest);
                    guestKeys.forEach((key) => {
                        guests.push(new Guest(data[index].guest[key].name, data[index].guest[key].isChild));
                    });
                }
                if (data[index].details) {
                    const detailsKeys = Object.keys(data[index].details);
                    detail = new Details(data[index].details[detailsKeys[0]].name, data[index].details[detailsKeys[0]].email);
                }
                this.users.push(new User(detail, guests));

            }
        });
    }

    ngOnInit() {
    }
}
