import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameService } from "../../services/game.service";
import { ItemPage } from "item/item.component";

@Component({
    selector: 'page-shop-tab',
    templateUrl: 'shop-tab.component.html'
})
export class ShopTabPage {
    gameList: any[];

    constructor(
        public navCtrl: NavController,
        public gameService: GameService
    ) {
        this.gameService.getGameList().then(data => {
            this.gameList = data;
        });
    }

    selectGame(id) {
        this.navCtrl.push(ItemPage, this.gameList[id]);
    }

}
