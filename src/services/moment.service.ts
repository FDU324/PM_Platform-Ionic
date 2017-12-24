import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Moment} from "../models/moment";
import {User} from "../models/user";
import {SocketService} from "./socket.service";
import {UserService} from "./user.service";

@Injectable()
export class MomentService {
    user: User;
    moments: Moment[];
    observers: any[];

    constructor(public http: HttpClient,
                public userService: UserService,
                public socketService: SocketService) {
    }

    updateAfterLogin() {
        this.user = this.userService.getCurrentUser();
        this.observers = [];

        // TODO:建立socket后取消下一行注释
        // this.receiveSocketOn();

        return this.requestMoments().then(data => {
            console.log(data);
            this.moments = JSON.parse(JSON.stringify(data));
        }).catch(err => {
            console.log('MomentService err' + err);
        });
    }

    receiveSocketOn() {
        this.socketService.getSocket().on('receiveMoment', (data) => {
            this.moments = JSON.parse(JSON.stringify(data));
        });
    }

    requestMoments() {
        // TODO:改为服务器地址
        return this.http.get('assets/data/moments-mock.json').toPromise().then(data => {
            return data;
        }).catch(err => {
            console.log('getGameList error');
            return this.moments;
        });
    }

    getMoments(): Moment[] {
        const compare = (a, b) => b.time - a.time;
        return this.moments.sort(compare);
    }

    registerPage(page: any) {
        this.observers.push(page);
    }

    removePage(page: any) {
        this.observers.splice(this.observers.indexOf(page), 1);
    }

    update() {
        this.observers.forEach(item => item.update());
    }


}
