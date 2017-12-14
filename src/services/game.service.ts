/**
 * Created by kevintestt on 2017/12/10.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GameService {

    constructor(public http: HttpClient) {
    }

    getGameList() {
        return this.http.get('../assets/data/games-mock.json').toPromise().then(data => {
            return data;
        }).catch(err => {
            console.log('getGameList error');
            return err;
        });
    }

}
