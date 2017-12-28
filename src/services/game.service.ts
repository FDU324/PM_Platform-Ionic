/**
 * Created by kevintestt on 2017/12/10.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from "../models/game";

@Injectable()
export class GameService {
    gameList: Game[];

    constructor(public http: HttpClient,) {
    }

    init() {
        return this.getGameListFromServer().then(data => {
            this.gameList = data;
            // for (let game of this.gameList) {
            //     game.downloading = false;
            //     game.loadPercent = 0;
            //     let sApp = startApp.set({
            //         "package": game.packageName,
            //     });
            //     sApp.check(function(values) {
            //         game.startText = "打开";
            //     }, function(error) {
            //         game.startText = "下载";
            //     });
            // }
        })
    }

    getGameListFromServer() {

        return this.http.get('http://120.25.238.161/PM/tank/gamelist.json').toPromise().then(data => {
            return data;
        }).catch(err => {
            console.log('getGameList error');
            return err;
        });

    }

    async getGameList(): Promise<Game[]> {
        await this.init();
        return this.gameList;
    }

}
