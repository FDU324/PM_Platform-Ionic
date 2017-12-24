import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {NavController, LoadingController} from 'ionic-angular';
import { GameService } from "../../services/game.service";
import { AccountService } from "../../services/account.service";
import { SearchGamePage } from "./search-game/search-game.component";

import {util} from 'util';
import {UserService} from "../../services/user.service";

@Component({
    selector: 'page-game-tab',
    templateUrl: 'game-tab.component.html'
})

export class GameTabPage {
    gameList: any[];
    showSearchBar: boolean;
    username: string;
    nickname: string;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public gameService: GameService,
        public userService: UserService
    ) {
        this.gameService.getGameList().then(data => {
            this.gameList = data;
            // for (let game of this.gameList) {
            //     game.downloading = false;
            //     game.loadPercent = 0;
            //     startApp.set({
            //         "package": game.packageName,
            //     }).check((values) => {
            //         game.startText = "打开";
            //     }, (error) => {
            //         game.startText = "下载";
            //     });
            // }

        });
        let currentUser = this.userService.getCurrentUser();
        this.username = currentUser.username;
        this.nickname = currentUser.nickname;
        this.showSearchBar = false;
    }

    startGame(game) {
        startApp.set({
            "package": game.packageName,
        }).check((values) => {
            game.startText = "打开";
        }, (error) => {
            game.startText = "下载";
        });

        if (game.startText === "打开") {
            let sApp = startApp.set({
                "action": "ACTION_VIEW",
                "uri": util.format(game.uri, this.username, this.nickname)
            });

            sApp.start(() => { /* success */
                console.log("OK");
            }, (error) => { /* fail */
                console.log(error);
            });
        } else {
            const file = new File();
            const fileTransfer = new FileTransfer().create();
            const uri = encodeURI(game.downloadLink);


            game.downloading = true;
            fileTransfer.onProgress((progressEvent: ProgressEvent) =>{
                if (progressEvent.lengthComputable) {
                   game.loadPersent = progressEvent.loaded / progressEvent.total * 100;
                }
            });

            // let timer = setInterval(() => {
            //     game.loadPercent += 1;
            //     if (game.loadPercent >= 100) {
            //         clearInterval(timer);
            //     }
            // }, 300);

            fileTransfer.download(uri, file.externalApplicationStorageDirectory+"/apk/"+game.name+".apk").then((entry) => {
                console.log('download complete: ' + entry.toURL());
                game.downloading = false;
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
