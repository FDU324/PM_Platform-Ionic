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

    ionViewDidEnter() {
        this.friendService.registerPage(this);
    }

    ionViewDidLeave() {
        this.friendService.removePage(this);
    }

    update() {
        this.sessions = this.friendService.getSessions();
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

    searchFriends(ev) {
        // Reset items back to all of the items
        this.sessions = this.friendService.getSessions();

        // set val to the value of the ev target
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.sessions = this.sessions.filter(session => {
                return session.friend.nickname.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1;
            });
        }
    }


}
