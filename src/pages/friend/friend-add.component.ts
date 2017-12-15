import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../models/user';

import { FriendService } from '../../services/friend.service';

@Component({
    templateUrl: 'friend-add.component.html',
})
export class FriendAddPage {
    user: User;
    username: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public friendService: FriendService) {
        this.username = '';
        this.user = navParams.get('user');
    }

    add() {
        if (this.username === this.user.username) {
            const toast = this.toastCtrl.create({
                message: '您不能添加自己为好友',
                duration: 1500,
                position: 'middle'
            });
            toast.onDidDismiss(() => {
                this.username = '';
            });
            toast.present();
            return;
        }
        this.friendService.searchUser(this.user.username, this.username)
            .then(data => {
                if (data === 'notExist') {
                    const toast = this.toastCtrl.create({
                        message: '您输入的用户不存在',
                        duration: 1500,
                        position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                        this.username = '';
                    });
                    toast.present();
                } else if (data === 'friend') {
                    const toast = this.toastCtrl.create({
                        message: '该用户已是您的好友',
                        duration: 1500,
                        position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                        this.username = '';
                    });
                    toast.present();
                } else if (data === 'success') {
                    const toast = this.toastCtrl.create({
                        message: '申请通知已经发出，请等待对方同意',
                        duration: 1500,
                        position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                        this.username = '';
                    });
                    toast.present();
                } else {
                    const toast = this.toastCtrl.create({
                        message: '服务器繁忙，请稍后重试',
                        duration: 1500,
                        position: 'middle'
                    });
                    toast.present();
                }
            }).catch(err => {
                console.log(err);
            });
    }


}