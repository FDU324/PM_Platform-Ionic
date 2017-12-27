/**
 * Created by kevintestt on 2017/12/12.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service'
import {Item} from '../models/item'

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
        return this.http.get('http://192.168.1.100:1337/Store/getItemList').toPromise().then(data => {
            for (let index in data) {
                let item = data[index];
                let tmp: Item = new Item(item.ItemId, item.DisplayName, "JB", item.VirtualCurrencyPrices.JB, 0, item.ItemImageUrl, {});
                let description: any = JSON.parse(item.CustomData);
                for (let key in description) {
                    let descriptionKey = key.substr(2, key.length-2);
                    tmp.description[descriptionKey] = description[key];
                }
                this.itemList.push(tmp);
            }
            //return this.http.get('http://192.168.1.100:1337/Store/getInventory?username=' + this.userService.getCurrentUser().username).toPromise();
            return this.http.get('http://192.168.1.100:1337/Store/getItemList').toPromise();
        }).then(data => {
            let mock = [
                {
                    "ItemId": "NormalCannon",
                    "ItemInstanceId": "6BAAFBA7E73C7D90",
                    "ItemClass": "Cannon",
                    "PurchaseDate": "2017-12-27T14:34:40.348Z",
                    "CatalogVersion": "Cannon",
                    "DisplayName": "普通炮弹",
                    "UnitCurrency": "JB",
                    "UnitPrice": 0
                },
                {
                    "ItemId": "NormalCannon",
                    "ItemInstanceId": "E4293B5036A368AB",
                    "ItemClass": "Cannon",
                    "PurchaseDate": "2017-12-27T14:26:41.058Z",
                    "CatalogVersion": "Cannon",
                    "DisplayName": "普通炮弹",
                    "UnitCurrency": "JB",
                    "UnitPrice": 0
                },
                {
                    "ItemId": "NormalCannon",
                    "ItemInstanceId": "E7A8143334FF0824",
                    "ItemClass": "Cannon",
                    "PurchaseDate": "2017-12-27T14:26:15.87Z",
                    "CatalogVersion": "Cannon",
                    "DisplayName": "普通炮弹",
                    "UnitCurrency": "JB",
                    "UnitPrice": 0
                }
            ];
            for (let store of mock) {
                console.log(store);
                let item = this.getItem(store.ItemId);
                item.store++;
            }
            return this.itemList;
        }).catch(err => {
            console.log('getItemList error');
            return err;
        });
    }

    purchaseItem(item) {
        let url = 'http://192.168.1.100:1337/Store/PurchaseGoods?id=' + item.id + "&virtualCurrency=" + item.currency + "&price=" + item.price + "&username=" + this.userService.getCurrentUser().username;
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
