import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';

@Component({
    templateUrl: 'account-info-modify.component.html'
})
export class AccountInfoModify {
    user: User;
    cityData: any[];
    cityName: string;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        public accountService: AccountService) {
        this.user = navParams.get('user');
        this.cityName = this.user.location;
        this.accountService.getCitiesData().then(data => {
            this.cityData = data;
        });
    }

    modifyUserImage() {

    }

    modifyNickName() {

    }

    modifyCity(event) {
        // this.accountService.modifyLocation(this.cityName).then(data => {
        //   if (data === 'success') {
        //     let toast = this.toastCtrl.create({
        //       message: '修改成功',
        //       duration: 1000,
        //       position: 'middle'
        //     });
        //     toast.onDidDismiss(() => {
        //       this.localUser.location = this.cityName;
        //     });
        //     toast.present();
        //   } else {
        //     let toast = this.toastCtrl.create({
        //       message: '修改失败，请重试',
        //       duration: 1500,
        //       position: 'middle'
        //     });
    
        //     toast.present();
        //   }
        // });
      }


}
