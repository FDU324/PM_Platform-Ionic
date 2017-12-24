/**
 * Created by kevintestt on 2017/12/10.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jsonp} from '@angular/http'
import {Game} from "../models/game";

@Injectable()
export class GameService {
    gameList: Game[];

    constructor(public http: HttpClient, public jsonp: Jsonp) {
    }

    init() {
        return this.getGameListFromServer().then(data => {
            this.gameList = data;
            for (let game of this.gameList) {
                game.downloading = false;
                game.loadPercent = 0;
                let sApp = startApp.set({
                    "package": game.packageName,
                });
                sApp.check(function(values) {
                    game.downloadText = "打开";
                }, function(error) {
                    game.downloadText = "下载";
                });
            }
        })
    }

    getGameListFromServer() {
        // let params = new URLSearchParams();
        // params.set('callback', 'JSONP_CALLBACK');
        // this.jsonp.get('http://120.25.238.161/tank/games-mock.json', {search: params})
        //     .map(res=> res.json())
        //     .subscribe((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.error(error);
        //     });
            
        return this.http.get('http://120.25.238.161/PM/tank/gamelist.json').toPromise().then(data => {
            return data;
        }).catch(err => {
            console.log('getGameList error');
            return err;
        });
        // return [
        //     {
        //         "id": 0,
        //         "name": "坦克大战",
        //         "icon": "icon",
        //         "image": "image",
        //         "description": "新奇的双人合作坦克手游",
        //         "category": "射击",
        //         "downloadLink": "http://120.25.238.161/test.apk",
        //         "packageName": "com.FDU.TANK",
        //         "downloadText": "test",
        //         "uri": "tank://TANK.FDU.com/launch?username="
        //     }
        // ];
    }

    async getGameList(): Promise<Game[]> {
        await this.init();
        return this.gameList;
    }

}
