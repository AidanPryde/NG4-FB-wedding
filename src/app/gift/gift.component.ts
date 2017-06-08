import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../app-routing.animation';

@Component({
    selector: 'app-gift',
    templateUrl: './gift.component.html',
    styleUrls: ['./gift.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class GiftComponent implements OnInit {
  state: '';

  constructor(public af: AngularFireAuth, private router: Router) {

  }

  ngOnInit() {
  }
}
