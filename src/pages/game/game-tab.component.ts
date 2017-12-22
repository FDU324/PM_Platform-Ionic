import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {NavController, LoadingController} from 'ionic-angular';
import { GameService } from "../../services/game.service";
import { SearchGamePage } from "./search-game/search-game.component";

@Component({
    selector: 'page-game-tab',
    templateUrl: 'game-tab.component.html'
})

export class GameTabPage {
    gameList: any[];
    showSearchBar: boolean;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public gameService: GameService,
    ) {
        this.gameService.getGameList().then(data => {
            this.gameList = data;
            for (let game of this.gameList) {
                let sApp = startApp.set({
                    "package": game.packageName,
                });
                sApp.check(function(values) {
                    game.downloadText = "打开";
                }, function(error) {
                    game.downloadText = "下载";
                });
            }
        });
        this.showSearchBar = false;
    }

    downloadGame(game) {

        if (game.downloadText === "打开") {
            let sApp = startApp.set({
                "action": "ACTION_VIEW",
                "uri": game.uri+"test"
            });

            sApp.start(function() { /* success */
                console.log("OK");
            }, function(error) { /* fail */
                console.log(error);
            });
        } else {
            var file = new File();
            var fileTransfer = new FileTransfer().create();
            var uri = encodeURI(game.downloadLink);

            let loading = this.loadingCtrl.create({
                content: '下载进度：0%'
            });
            loading.present();

            let no:number = 0;
            fileTransfer.onProgress((progressEvent: ProgressEvent) =>{
                if (progressEvent.lengthComputable) {
                    no = progressEvent.loaded / progressEvent.total * 100;
                }
            });

            let timer = setInterval(() => {
                loading.setContent('下载进度：' + Math.floor(no) + '%');
                if (no >= 99) {
                    clearInterval(timer);
                }
            }, 300);

            fileTransfer.download(uri, file.externalApplicationStorageDirectory+game.name+".apk").then((entry) => {
                console.log('download complete: ' + entry.toURL());
                if (timer) {
                    clearInterval(timer);
                }
                loading.dismiss();
                var fileOpener = new FileOpener();
                fileOpener.open(entry.toURL(), 'application/vnd.android.package-archive')
                    .then(() => console.log('File is opened'))
                    .catch(e => console.log('Error opening file', e));
            }, (error) => {
                console.log(error.code);
                console.log(error.http_status);
                console.log(error.target);
            });
        }
    }

    toggleSearchBar() {
        this.showSearchBar = !this.showSearchBar;
    }

    searchGame(ev: any) {
        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            console.log(val);
            this.toggleSearchBar();
            this.navCtrl.push(SearchGamePage, {
                title: val,
                gameList: this.gameList
            })
        }
    }

}
