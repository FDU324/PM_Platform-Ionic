import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GameService } from "../../../services/game.service";
import { ShopService } from "../../../services/shop.service";

@Component({
    selector: 'page-item-component',
    templateUrl: 'item.component.html'
})
export class ItemPage {
    game: any;
    itemList: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public gameService: GameService,
        public shopService: ShopService
    ) {
        this.game = this.navParams.data;
        this.shopService.getItemList(this.game.id).then(data => {
            this.itemList = data;
        });
    }

    purchaseItem(id) {
        this.shopService.purchaseItem(this.game.id, id).then(data => {
            let alert = this.alertCtrl.create({
                subTitle: '恭喜您，购买成功！',
                buttons: ['好的']
            });
            alert.present();
        });
    }

}
