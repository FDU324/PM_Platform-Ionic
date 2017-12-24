import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {User} from "../../models/user";
import {Moment} from "../../models/moment";
import {MomentService} from "../../services/moment.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'page-moment-tab',
    templateUrl: 'moment-tab.component.html'
})
export class MomentTabPage {
    user: User;
    moments: Moment[];

    constructor(public navCtrl: NavController,
                public userService: UserService,
                public momentService: MomentService) {
        this.user = this.userService.getCurrentUser();
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
