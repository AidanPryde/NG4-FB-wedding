import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../app.routes.animations';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class LogoutComponent implements OnInit {

    state: string = '';
    error: any;

    constructor(public af: AngularFireAuth, private router: Router) {
        this.af.auth.signOut()
        .then((success) => {
            this.router.navigate(['/'])
        }).catch((err) => {
            this.error = err;
        })
    }

    ngOnInit() {
    }

}