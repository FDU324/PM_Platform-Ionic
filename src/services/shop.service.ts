/**
 * Created by kevintestt on 2017/12/12.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ShopService {

    constructor(public http: HttpClient) {
    }

    getItemList(id) {
        return this.http.get('../assets/data/items-mock.json').toPromise().then(data => {
            return data;
        }).catch(err => {
            console.log('getItemList error');
            return err;
        });
    }

    purchaseItem(gameId, itemId) {
        return this.http.get('../assets/data/items-mock.json').toPromise().then(data => {
            return true;
        }).catch(err => {
            console.log('getItemList error');
            return err;
        });
    }

}
