import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';

import {Session} from '../../models/session';
import {User} from '../../models/user';

import {FriendService} from '../../services/friend.service';

import {FriendChatPage} from './friend-chat.component';
import {FriendAddPage} from './friend-add.component';
import {FriendRequestPage} from './friend-request.component';
import {UserService} from "../../services/user.service";

@Component({
    templateUrl: 'friend-tab.component.html'
})
export class FriendTabPage {
    sessions: Session[];
    user: User;
    friendRequests: User[];

    constructor(public navCtrl: NavController,
                public appCtrl: App,
                public userService: UserService,
                public friendService: FriendService) {
        this.user = this.userService.getCurrentUser();
        this.sessions = this.friendService.getSessions();
        this.friendRequests = this.friendService.getFriendRequests();
    }

    chat(session: Session) {
        this.appCtrl.getRootNav().push(FriendChatPage, {
            user: this.user,
            session: session,
        });
    }

    addFriend() {
        this.navCtrl.push(FriendAddPage, {
            user: this.user
        });
    }

    seeFriendRequests() {
        this.friendService.clearFriendRequests();
        this.appCtrl.getRootNav().push(FriendRequestPage);
    }


}
