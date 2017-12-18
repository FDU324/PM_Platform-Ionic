import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {User} from "../../models/user";
import {Moment} from "../../models/moment";
import {AccountService} from "../../services/account.service";
import {MomentService} from "../../services/moment.service";

@Component({
    selector: 'page-moment-tab',
    templateUrl: 'moment-tab.component.html'
})
export class MomentTabPage {
    user: User;
    moments:Moment[];

    constructor(public navCtrl: NavController,
                public accountService:AccountService,
                public momentService:MomentService) {
        this.user = this.accountService.getCurrentUser();
        this.moments = this.momentService.getMoments();
    }

    ionViewDidEnter() {
        this.momentService.registerPage(this);
    }

    ionViewDidLeave() {
        this.momentService.removePage(this);
    }

    update() {
        this.moments = this.momentService.getMoments();
    }


}
