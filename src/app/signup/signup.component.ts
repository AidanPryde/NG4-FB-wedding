import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../app-routing.animation';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

    state: '';
    error: any;

    constructor(public af: AngularFireAuth, private router: Router) {

    }

    onSubmit(formData) {
        if (formData.valid) {
            console.log('auth service >> signup >> sent form data valid');
            this.af.auth
            .createUserWithEmailAndPassword(
                formData.value.email,
                formData.value.password
            ).then(() => {
                console.log('auth service >> signup >> user created');
                this.af.auth.currentUser
                .updateProfile({
                    displayName: formData.value.name,
                    photoURL: ''
                })
                .then(() => {
                    console.log('auth service >> signup >> name added, redirect to home');
                    this.router.navigate(['/home'])
                })
                .catch((err) => {
                    console.log('auth service >> signup >> name adding error');
                    this.error = err;
                });
            }).catch((err) => {
                console.log('auth service >> signup >> user create error');
                this.error = err;
            })
        }
    }

    ngOnInit() {
    }

}
