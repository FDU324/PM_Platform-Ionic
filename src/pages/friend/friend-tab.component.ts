import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Session } from '../../models/session';

@Component({
    selector: 'page-friend-tab',
    templateUrl: 'friend-tab.component.html'
})
export class FriendTabPage {
    lastSessions: Session[];   // 所有聊天内容，一个元素对应一个好友会话

    constructor(public navCtrl: NavController) {

    }

}
