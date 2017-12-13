import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SignUpPage } from '../signUp/signUp';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-start',
    templateUrl: 'start.html',
})
export class StartPage {

    constructor(public navCtrl: NavController,
        public navParams: NavParams, ) {
    }

    login() {
        this.navCtrl.push(LoginPage);
    }

    signUp() {
        this.navCtrl.push(SignUpPage);
    }


}