import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { moveIn, fallIn } from '../app-routing.animation';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class LogoutComponent implements OnInit {

    state: '';
    error: any;

    constructor(public afa: AngularFireAuth, private router: Router) {
        if (afa.authState) {
            afa.auth
            .signOut()
            .then(() => {
                console.log('auth service >> logout >> success redirect to login');
                this.router.navigateByUrl('/login');
            }).catch((err) => {
                console.log('auth service >> logout >> error');
                console.log(err);
            })
        } else {
            console.log('auth service >> logout >> already logged out, redirect to home');
            this.router.navigateByUrl('/home');
        }
    }

    ngOnInit() {
    }

}
