import {Component} from '@angular/core';

import {GameTabPage} from '../game/game-tab.component';
import {FriendTabPage} from '../friend/friend-tab.component';
import {ShopTabPage} from '../shop/shop-tab.component';
import {MomentTabPage} from '../moment/moment-tab.component';
import {AccountTabPage} from '../account/account-tab.component';
import {FriendService} from "../../services/friend.service";
import {MomentService} from "../../services/moment.service";


@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = GameTabPage;
    tab2Root = FriendTabPage;
    tab3Root = ShopTabPage;
    tab4Root = MomentTabPage;
    tab5Root = AccountTabPage;

    totalNewMessageCount: number = 0;
    totalNewMomentCount: number = 0;

    constructor(public friendService: FriendService,
                public momentService: MomentService) {

    }

    ionViewDidLoad() {
        this.friendService.registerPage(this);
        this.momentService.registerPage(this);
    }


    ionViewCanEnter() {
        this.totalNewMessageCount = this.friendService.getTotalNewMessageCount();
        this.totalNewMomentCount = this.momentService.getNewMomentCount();
    }

    update() {
        this.totalNewMessageCount = this.friendService.getTotalNewMessageCount();
        this.totalNewMomentCount = this.momentService.getNewMomentCount();

    }
}
