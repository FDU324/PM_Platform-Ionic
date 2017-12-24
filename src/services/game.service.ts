/**
 * Created by kevintestt on 2017/12/10.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jsonp} from '@angular/http'


@Injectable()
export class GameService {

    constructor(public http: HttpClient, public jsonp: Jsonp) {
    }

    getGameList() {
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
            console.log(data);
            return data;
        }).catch(err => {
            console.log('getGameList error');
            return err;
        });
    }

}
