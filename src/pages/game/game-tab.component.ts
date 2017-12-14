import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameService } from "../../services/game.service";

@Component({
    selector: 'game-account-tab',
    templateUrl: 'game-tab.component.html'
})
export class GameTabPage {
    gameList: any[];

    constructor(
        public navCtrl: NavController,
        public gameService: GameService
    ) {
        this.gameService.getGameList().then(data => {
            this.gameList = data;
        });
    }

}
