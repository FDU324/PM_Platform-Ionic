import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
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
        public gameService: GameService,
    ) {
        this.gameService.getGameList().then(data => {
            this.gameList = data;
        });
    }

    downloadGame() {

        var file = new File();
        var fileTransfer = new FileTransfer().create();
        var uri = encodeURI("http://120.25.238.161/test.apk");

        fileTransfer.download(uri, file.externalApplicationStorageDirectory+"test.apk").then((entry) => {
            console.log('download complete: ' + entry.toURL());
            var fileOpener = new FileOpener();
            fileOpener.open(entry.toURL(), 'application/vnd.android.package-archive')
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));
        }, (error) => {
            console.log(error.code);
            console.log(error.http_status);
            console.log(error.target);
        });
    }

}
