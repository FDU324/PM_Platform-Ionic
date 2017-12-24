import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, NavParams, Content, App, AlertController} from 'ionic-angular';

import {User} from '../../models/user';
import {Session} from '../../models/session';

import {TabsPage} from '../tabs/tabs';

import {FriendService} from '../../services/friend.service';


@Component({
    templateUrl: 'friend-chat.component.html',
})


export class FriendChatPage {
    @ViewChild(Content) content: Content;
    session: Session;
    friend: User;
    user: User;
    inputContent: string;

    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                public alertCtrl: AlertController,
                public navParams: NavParams,
                public appCtrl: App,
                public friendService: FriendService,) {
        this.session = navParams.get('session');
        this.user = navParams.get('user');
        this.friend = this.session.friend;
        this.inputContent = "";
    }

    ionViewDidLoad() {
        this.friendService.registerPage(this);
        this.friendService.clearNewMessages(this.session);
    }

    ionViewDidLeave() {
        this.friendService.removePage(this);

        if (this.session) {
            let keyName = this.user.username + '_' + 'session_' + this.friend.username;
            let value = JSON.stringify(this.session);

            // this.nativeStorage.setItem(keyName, { data: value }).then(
            //     () => {
            //         // console.log('Success storing '+keyName);
            //         keyName = this.localUser.username + '_totalNewMessageCount';
            //         this.nativeStorage.setItem(keyName, { data: this.chatService.totalNewMessageCount }).then(
            //             () => {
            //             },
            //             error => {
            //                 console.log('Error storing totalNewMessageCount : ' + error);
            //             }
            //         );
            //     },
            //     error => {
            //         console.log('Error storing ' + keyName + ' : ' + error);
            //     }
            // );
        }
    }

    update() {
        this.session = this.friendService.getSessionByFriend(this.friend);
        this.friendService.clearNewMessages(this.session);
        this.content.scrollToBottom(3000);
    }

    log(text: string) {
        console.log(text);
    }

    sendMessage() {
        this.friendService.sendMessage(this.user, this.friend, 'text', this.inputContent).then(
            (session) => {
                if (typeof session !== 'string') {
                    this.session = session;
                    //console.log(this.session);
                    this.inputContent = '';
                    this.content.scrollToBottom(3000);
                }
                else if (session === 'refuse') {
                    let alert = this.alertCtrl.create({
                        title: '失败!',
                        subTitle: '你还不是对方的好友，先添加对方好友才能聊天!',
                        buttons: ['OK']
                    });
                    alert.present();
                    this.inputContent = '';
                }
            }
        );
    }

    searchMessage() {

    }


    showUserDetail(userType: string) {
        // let user: User;
        // if (userType === 'me')
        //     user = this.localUser;
        // else
        //     user = this.friend;
        // this.navCtrl.push(FriendDetailPage, {
        //     friend: user
        // });
    }

}
