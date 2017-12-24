import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {User} from '../../models/user';
import {AccountInfoModify} from './account-info-modify.component';
import {UserService} from "../../services/user.service";

@Component({
    selector: 'page-account-tab',
    templateUrl: 'account-tab.component.html'
})
export class AccountTabPage {
    user: User;

    constructor(public navCtrl: NavController,
                public appCtrl: App,
                public userService: UserService) {
        this.user = this.userService.getCurrentUser();
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
