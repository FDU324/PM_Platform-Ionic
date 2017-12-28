import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GameService } from "../../../services/game.service";
import { ShopService } from "../../../services/shop.service";
import { Item } from "../../../models/item";

@Component({
    selector: 'page-item-component',
    templateUrl: 'item.component.html'
})
export class ItemPage {
    game: any;
    itemList: Item[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public gameService: GameService,
        public shopService: ShopService
    ) {
        this.game = this.navParams.data;
        this.shopService.getItemList().then(data => {
            console.log(JSON.stringify(data));
            this.itemList = data;
        });
    }

    purchaseItem(item) {
        console.log(JSON.stringify(item));
        this.shopService.purchaseItem(item).then(data => {
            let alert = this.alertCtrl.create({
                subTitle: '恭喜您，购买成功！',
                buttons: ['好的']
            });
            item.store++;
            alert.present();
        });
    }

    getKeys(object) {
        return Object.keys(object);
    }

}
