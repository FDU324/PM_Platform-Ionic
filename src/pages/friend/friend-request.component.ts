import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { FriendService } from '../../services/friend.service';


@Component({
    templateUrl: 'friend-request.component.html',
})

export class FriendRequestPage {
    user: User;        
    friendRequests: User[];

    constructor(public navCtrl: NavController,
        public accountService: AccountService,
        public friendService: FriendService,
    ) {
        this.user = this.accountService.getCurrentUser();
        this.friendRequests = this.friendService.getFriendRequests();
    }

    ionViewDidEnter() {
        this.friendService.registerPage(this);
    }

    ionViewDidLeave() {
        this.friendService.removePage(this);
    }

    update() {
        this.friendRequests = this.friendService.getFriendRequests();
    }

    acceptRequest(friend: User) {
        this.friendService.acceptRequest(this.user.username, friend.username);
        console.log('accept request!');
    }






}