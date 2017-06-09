import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../app-routing.animation';

class Gift {
  $key: string;

  constructor(
    public name: string,
    public isAlreadySelected: boolean,
    public createdByName: string,
    public createdByUid: string,
    public selectedByName: string,
    public selectedByUid: string
  ) { }
}

@Component({
    selector: 'app-gift',
    templateUrl: './gift.component.html',
    styleUrls: ['./gift.component.css'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class GiftComponent implements OnInit {
  state: '';
  selectedGifts: Gift[];
  notSelectedGifts: Gift[];
  giftName: '';
  error: Error;

  constructor(public afd: AngularFireDatabase, public afa: AngularFireAuth) {
      afd.list('/gift', {
        query: {
          orderByChild: 'isAlreadySelected',
          equalTo: true
        }
      }).subscribe(data => {
        this.selectedGifts = data;
      });
      afd.list('/gift', {
        query: {
          orderByChild: 'isAlreadySelected',
          equalTo: false
        }
      }).subscribe(data => {
        this.notSelectedGifts = data;
      });
  }

  generateGift() {
    if (this.giftName === '') {
      this.error = new Error('Adj nevet az ajándékodnak.');
    } else {
      this.afd.list('/gift')
      .push(
        new Gift(
          this.giftName,
          false,
          this.afa.auth.currentUser.displayName,
          this.afa.auth.currentUser.uid,
          '',
          ''
        )
      )
      .then(() => {})
      .catch((err) => {
        this.error = err;
      });
    }
  }

  selectGift(data) {
    if (data.isAlreadySelected) {
      if (data.selectedByName === this.afa.auth.currentUser.displayName && data.selectedByUid === this.afa.auth.currentUser.uid) {
        data.selectedByName = '';
        data.selectedByUid = '';
      } else {
        return;
      }
    } else {
      data.selectedByName = this.afa.auth.currentUser.displayName;
      data.selectedByUid = this.afa.auth.currentUser.uid;
    }
    data.isAlreadySelected = !data.isAlreadySelected;
    this.afd.list('/gift')
      .update(data.$key, data)
      .then(() => {

      })
      .catch((err) => {
        this.error = err;
      });
  }

  removeGift(data) {
    this.afd.list('/gift')
    .remove(data)
    .then(() => {})
    .catch((err) => {
      this.error = err;
    });
  }

  ngOnInit() {
  }
}
