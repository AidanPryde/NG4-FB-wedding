import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../app-routing.animation';

import { MyAuthService } from '../services/auth.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class ProfileComponent implements OnInit {

    state: '';
    error: any;

    constructor(public afa: AngularFireAuth) {

    }

    onSubmit(formData) {
        if (formData.valid) {
            this.afa.auth.currentUser.updateProfile({
                displayName: formData.value.name,
                photoURL: ''
            }).then(() => {
                console.log('auth service >> profile >> success');
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
