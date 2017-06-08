import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuard } from './auth-guard.service';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class MyAuthService {

    constructor(private afa: AngularFireAuth, private ag: AuthGuard) {
    }

}
