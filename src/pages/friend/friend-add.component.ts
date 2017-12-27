import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import {User} from '../../models/user';

import {FriendService} from '../../services/friend.service';

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

        this.friendService.addFriend(this.user.username, this.username).then(data => {
            const toast = this.toastCtrl.create({
                message: '添加成功',
                duration: 1500,
                position: 'middle'
            });
            toast.onDidDismiss(() => {
                this.username = '';
            });
            toast.present();
        }).catch(err => {
            const toast = this.toastCtrl.create({
                message: '服务器错误，请稍后重试',
                duration: 1500,
                position: 'middle'
            });
            toast.present();
        });


    }


}
