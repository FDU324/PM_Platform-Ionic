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
        }).catch(err => {
        });
    }

    receiveSocketOn() {
        this.socketService.getSocket().on('newReport', (data) => {
            this.requestMoments().then(data => {
                this.update();
            }).catch(err => {
            });
        });
    }

    requestMoments() {
        // TODO:改为服务器地址
        return this.http.get('http://localhost:1337/userdata/getMoments?username='+this.user.username, {responseType: 'text'}).toPromise().then(data => {
            if (data === 'fail') {
                return Promise.reject('error');
            }

            this.moments = JSON.parse(data).map(i => {
                return new Moment(i['user'], i['time'], i['image'], '坦克大战');
            });

            return Promise.resolve('success');
        }).catch(err => {
            console.log('getGameList error:' + err);
            return Promise.reject('error');
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
