import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';

import { moveIn, fallIn, moveInLeft } from './app-routing.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})

export class AppComponent {
  authState;
  name: string;

  constructor(public afa: AngularFireAuth) {
    this.authState = afa.authState;
    /*afa.authState.subscribe(data => {
      if (data != null) {
        this.name = data.displayName;
      } else {
        this.name = '';
      }
    });*/
  }
}
