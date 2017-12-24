import {Component} from '@angular/core';
import {NavController, App, ToastController} from 'ionic-angular';

import {User} from '../../models/user';

import {AccountInfoModifyPage} from './account-info-modify.component';
import {StartPage} from '../start/start';

import {UserService} from "../../services/user.service";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'page-account-tab',
    templateUrl: 'account-tab.component.html'
})
export class AccountTabPage {
    user: User;

    constructor(public navCtrl: NavController,
                public appCtrl: App,
                public toastCtrl: ToastController,
                public userService: UserService,
                public socketService: SocketService) {
        this.user = this.userService.getCurrentUser();
    }

    modifyInfo() {
        this.appCtrl.getRootNav().push(AccountInfoModifyPage, {
            user: this.user,
        });
    }

    myGame() {

    }

    auxiliaryTool() {
        const toast = this.toastCtrl.create({
            message: '内容建设中',
            duration: 1500,
            position: 'middle'
        });

        toast.present();
    }

    latestActivity() {
        const toast = this.toastCtrl.create({
            message: '内容建设中',
            duration: 1500,
            position: 'middle'
        });

        toast.present();
    }

    logout() {
        this.navCtrl.setRoot(StartPage);

        // this.socketService.emitPromise('logout', this.user.username).then(() => {
        //     this.socketService.getSocket().disconnect();
        //     this.socketService.setSocketNull();
        //     this.navCtrl.setRoot(StartPage);
        // }).catch(error => {
        //     console.log('AccountTabPage-logout:', error);
        // });
    }


}
