import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {StartPage} from "../start/start";
import {TabsPage} from '../tabs/tabs';
import {SignUpPage} from "../signUp/signUp";

import {SignUpLoginService} from '../../services/signUp-login.service';
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    username: string;
    password: string;
    showPsw: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public signUpLoginService: SignUpLoginService,
                public socketService: SocketService,) {
        this.username = this.navParams.get('username') || '';
        this.password = '';
        this.showPsw = false;
    }

    changeShowPsw() {
        this.showPsw = !this.showPsw;
    }

    onSubmit() {
        let loading = this.loadingCtrl.create({
            content: "登录中，请稍等",
        });

        loading.present();

        this.signUpLoginService.login(this.username, this.password).then((user) => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
            // if (typeof user === 'object') {
            //     loading.dismiss();
            //     this.navCtrl.setRoot(TabsPage);
            //     // 开始监听logout事件，一旦有人登录相同账号，此账号被迫退出
            //     this.socketService.getSocket().on('logout', () => {
            //         this.socketService.getSocket().disconnect();
            //         this.socketService.setSocketNull();
            //         let alert = this.alertCtrl.create({
            //             title: '警告',
            //             subTitle: '相同账号在另一个设备上登录',
            //             buttons: ['确定']
            //         });
            //         alert.present();
            //         this.navCtrl.setRoot(StartPage);
            //     });
            // } else {
            //     let alert = this.alertCtrl.create({
            //         title: '登录失败',
            //         subTitle: '账号或密码错误，请检查后重试',
            //         buttons: ['确定']
            //     });
            //     loading.dismiss();
            //     alert.present();
            // }
        }).catch((error) => {
            console.log('LoginPage-onSubmit', error);
            const alert = this.alertCtrl.create({
                title: '登录失败',
                subTitle: '服务器错误，请稍后重试',
                buttons: ['确定']
            });
            loading.dismiss();
            alert.present();
        });
    }

    gotoRegister() {
        this.navCtrl.push(SignUpPage);
    }

    forget() {
        // this.navCtrl.push(ChangePasswordPage);
    }

}
