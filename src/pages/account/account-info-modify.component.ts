import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {User} from '../../models/user';

@Component({
    templateUrl: 'account-info-modify.component.html'
})
export class AccountInfoModifyPage {
    user: User;

    constructor(public navParams: NavParams,
                public navCtrl: NavController,) {
        this.user = navParams.get('user');
    }

    modifyUserImage() {

    }

    modifyNickName() {

    }

    save() {

    }

}
