import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../app.routes.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

    state: string = '';
    error: any;

    constructor(public af: AngularFireAuth, private router: Router) {
        /*this.af.auth.subscribe(auth => { 
        if(auth) {
            this.router.navigateByUrl('/');
        }
        });*/
    }

    onSubmit(formData) {
        if(formData.valid) {
            console.log(formData.value);
            this.af.auth.signInWithEmailAndPassword(
                formData.value.email,
                formData.value.password
            ).then(
            (success) => {
                console.log(success);
                this.router.navigate(['/']);
            }).catch(
            (err) => {
                console.log(err);
                this.error = err;
            })
        }
    }

    ngOnInit() {
    }

}