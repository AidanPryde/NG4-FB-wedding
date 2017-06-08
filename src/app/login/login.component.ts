import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../app-routing.animation';

import { MyAuthService } from '../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

    state: '';
    error: any;

    constructor(public afa: AngularFireAuth, private router: Router) {
        this.afa.authState.subscribe(authState => {
            if (authState) {
                console.log('auth service >> login >> already logged in, redirect to home');
                this.router.navigateByUrl('/home');
            }
        });
    }

    onSubmit(formData) {
        if (formData.valid) {
            if ((this.afa.authState != null)) {
                this.afa.auth.signInWithEmailAndPassword(
                    formData.value.email,
                    formData.value.password
                ).then(() => {
                    console.log('auth service >> login >> success');
                    return Promise.resolve();
                }).catch((err) => {
                    console.log('auth service >> login >> err');
                    console.log(err);
                    return Promise.reject(err);
                });
            } else {
                console.log('auth service >> login >> already logged in');
                return Promise.reject('Már be voltál jelentkezve.');
            }
        }
    }

    ngOnInit() {
    }

}
