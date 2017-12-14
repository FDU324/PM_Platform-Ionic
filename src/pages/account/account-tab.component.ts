import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { AccountInfoModify } from './account-info-modify.component';

@Component({
    selector: 'page-account-tab',
    templateUrl: 'account-tab.component.html'
})
export class AccountTabPage {
    user: User;

    constructor(
        public navCtrl: NavController,
        public appCtrl: App,
        public accountService: AccountService) {
        this.user = this.accountService.getCurrentUser();
    }

    modifyInfo() {
        this.appCtrl.getRootNav().push(AccountInfoModify, {
            user: this.user
        });

    }

    myGame() {

    }

    auxiliaryTool() {

    }

    latestActivity() {

    }





}
