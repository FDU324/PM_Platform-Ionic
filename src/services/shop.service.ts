/**
 * Created by kevintestt on 2017/12/12.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service'
import {Item} from '../models/item'
import {format} from 'util'

@Injectable()
export class ShopService {
    itemList: Item[];

    constructor(
        public http: HttpClient,
        public userService: UserService) {
        this.itemList = [];
    }

    getItemList() {
        this.itemList = [];
        return this.http.get('http://120.25.238.161:1337/Store/getItemList').toPromise().then(data => {
            for (let index in data) {
                let item = data[index];
                if (item.VirtualCurrencyPrices.JB === 0) {
                    continue;
                }
                let tmp: Item = new Item(item.ItemId, item.DisplayName, "JB", item.VirtualCurrencyPrices.JB, 0, item.ItemImageUrl, {});
                let description: any = JSON.parse(item.CustomData);
                for (let key in description) {
                    let descriptionKey = key.substr(2, key.length-2);
                    tmp.description[descriptionKey] = description[key];
                }
                this.itemList.push(tmp);
            }
            let url = format('http://120.25.238.161:1337/Store/getInventory?username=%s', this.userService.getCurrentUser().username);
            return this.http.get(url).toPromise();
            //return this.http.get('http://120.25.238.161:1337/Store/getItemList').toPromise();
        }).then(data => {
            for (let index in data) {
                let store = data[index];
                let item = this.getItem(store.ItemId);
                if (item === null) {
                    continue;
                }
                item.store++;
            }
            return this.itemList;
        }).catch(err => {
            console.log('getItemList error');
            return err;
        });
    }

    purchaseItem(item) {
        let url = format('http://120.25.238.161:1337/Store/PurchaseGoods?id=%s&virtualCurrency=%s&price=%d&username=%s', item.id, item.currency, item.price, this.userService.getCurrentUser().username);
        console.log(url);
        return this.http.get(url).toPromise().then(data => {
            return true;
        }).catch(err => {
            console.log('purchaseItem error');
            return err;
        });
    }

    getItem(id) {
        for (let item of this.itemList) {
            if (item.id === id) {
                return item;
            }
        }
        return null;
    }

}
