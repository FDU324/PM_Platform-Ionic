import {Component} from '@angular/core';
import {
    NavController, NavParams,
    LoadingController, ActionSheetController,
    AlertController, ToastController
} from 'ionic-angular';

import {LoginPage} from '../login/login';

import {User} from "../../models/user";

import {SignUpLoginService} from "../../services/signUp-login.service";
import {ImgService} from "../../services/img.service";

@Component({
    selector: 'page-signUp',
    templateUrl: 'signUp.html',
})
export class SignUpPage {
    username: string;
    email: string;
    password: string;
    nickname: string;
    defaultImage: string;
    userImage: string;
    showPsw: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public actionSheetCtrl: ActionSheetController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController,
                public imgService: ImgService,
                public signUpLoginService: SignUpLoginService,) {
        this.username = '';
        this.email = '';
        this.password = '';
        this.nickname = '';
        this.defaultImage = 'http://120.25.238.161/PM/platform/userImg/0.jpg';
        this.userImage = this.defaultImage;
        this.showPsw = false;
    }



    changeShowPsw() {
        this.showPsw = !this.showPsw;
    }

    changeImage() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: '拍照',
                    role: 'destructive',
                    handler: () => {
                        this.takeCamera();
                    }
                }, {
                    text: '从手机相册选择',
                    handler: () => {
                        this.pickImg();
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    pickImg() {
        this.imgService.openImgPickerSingle().then((url) => {
            if (url === 'error') {
                console.log('error');
            } else {
                // TODO；上传到服务器
                //this.imgService.sendFile(this.localUser, url);
                console.log(url);
                this.userImage = url;
                //this.localUser.userimage = url[0];
            }
        });
    }

    takeCamera() {
        this.imgService.openCamera().then((url) => {
            if (url === 'error') {
                console.log('error');
            } else {
                // TODO；上传到服务器
                //this.imgService.sendFile(this.localUser, url);
                this.userImage = url;
                console.log(url);
            }
        });
    }

    onSubmit() {
        // this.navCtrl.setRoot(LoginPage);
        const loading = this.loadingCtrl.create({
            content: "注册中，请稍等",
        });
        let toast = null;
        loading.present();

        if (this.password.length < 6 || this.password.length > 100) {
            toast = this.toastCtrl.create({
                message: '密码长度在6--100字符间',
                duration: 1500,
                position: 'middle'
            });
            loading.dismiss();
            toast.present();
            return;
        }

        // const reg = /^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        // if (!reg.test(this.email)) {
        //     toast = this.toastCtrl.create({
        //         message: '邮箱格式错误',
        //         duration: 1500,
        //         position: 'middle'
        //     });
        //     loading.dismiss();
        //     toast.present();
        //     return;
        // }


        this.signUpLoginService.signUp(this.username, this.email, this.password, this.nickname, this.userImage).then((data) => {

            if (this.userImage === this.defaultImage) { // 使用了默认头像
                toast = this.toastCtrl.create({
                    message: '注册成功，头像为默认图片',
                    duration: 1500,
                    position: 'middle'
                });
                toast.onDidDismiss(() => {
                    this.navCtrl.setRoot(LoginPage);
                });
                loading.dismiss();
                toast.present();
                return;
            }

            const user = new User(this.username, this.email, this.nickname, this.userImage);
            this.imgService.sendFile(user, this.userImage, 'userImage').then((res) => {
                this.imgService.modifyImageAtSignUp(this.username, res).then((r) => {
                    toast = this.toastCtrl.create({
                        message: '注册成功且选择头像成功',
                        duration: 1500,
                        position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                        this.navCtrl.setRoot(LoginPage);
                    });
                    loading.dismiss();
                    toast.present();
                }).catch(err => {
                    toast = (toast != null) ? toast : this.toastCtrl.create({
                        message: '注册成功,但头像自定义失败',
                        duration: 1500,
                        position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                        this.navCtrl.setRoot(LoginPage);
                    });
                    loading.dismiss();
                    toast.present();
                });
            }).catch(err => {
                toast = (toast != null) ? toast : this.toastCtrl.create({
                    message: '注册成功,但头像自定义失败',
                    duration: 1500,
                    position: 'middle'
                });
                toast.onDidDismiss(() => {
                    this.navCtrl.setRoot(LoginPage);
                });
                loading.dismiss();
                toast.present();
            });
        }).catch(err => {
            const alert = this.alertCtrl.create({
                title: '注册失败',
                subTitle: '账号已被注册或服务器错误，请重试',
                buttons: ['确定']
            });
            loading.dismiss();
            alert.present();
        });
    }

}
