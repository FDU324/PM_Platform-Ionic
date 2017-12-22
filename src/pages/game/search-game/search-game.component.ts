import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import { GameService } from "../../../services/game.service";

@Component({
    selector: 'page-search-game',
    templateUrl: 'search-game.component.html'
})

export class SearchGamePage {
    gameList: any[];
    title: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public gameService: GameService,
    ) {
        this.title = this.navParams.data.title;
        this.gameList = this.navParams.data.gameList;
    }

    downloadGame(game) {

        if (game.downloadText === "打开") {
            let sApp = startApp.set({
                "package": game.packageName
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

}
