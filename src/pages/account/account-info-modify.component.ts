import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';

@Component({
    templateUrl: 'account-info-modify.component.html'
})
export class AccountInfoModify {
    user: User;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        public accountService: AccountService) {
        this.user = navParams.get('user');
    }

    modifyUserImage() {

    }

    modifyNickName() {

    }

}
