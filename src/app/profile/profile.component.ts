import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../app-routing.animation';

import { MyAuthService } from '../services/auth.service';

class Details {
  $key: string;

  constructor(
    public name: string
  ) { }
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class ProfileComponent implements OnInit {

    detail: Details;

    state: '';
    error: any;

    name: string;

    constructor(public afd: AngularFireDatabase, public afa: AngularFireAuth) {
        afd.list('/user/' + this.afa.auth.currentUser.uid + '/details')
        .subscribe(data => {
            this.detail = data[0];
            console.log(data);
            console.log(this.detail);
            if (this.detail === undefined) {
                this.afd.list('/user/' + this.afa.auth.currentUser.uid + '/details')
                .push(
                    new Details('<Üres>')
                ).then((what) => {
                    console.log(what);
                    console.log('database service >> update >> name added, redirect to home');
                })
                .catch((err) => {
                    console.log('database service >> update >> name adding error');
                    this.error = err;
                });
            }
        });
    }

    onSubmit(formData) {
        if (formData.valid) {
            this.afa.auth.currentUser.updateProfile({
                displayName: formData.value.name,
                photoURL: ''
            }).then(() => {
                console.log('auth service >> profile >> success');
                this.afd.list('/user/' + this.afa.auth.currentUser.uid + '/details')
                .update(this.detail.$key, new Details(formData.value.name))
                .then(() => {
                    console.log('database service >> update >> name updated');
                })
                .catch((err) => {
                    console.log('database service >> update >> name adding error');
                    this.error = err;
                });
            }).catch((err) => {
                console.log('auth service >> profile >> err');
                console.log(err);
                this.error = err;
            });
        }
    }

    ngOnInit() {
    }

}
