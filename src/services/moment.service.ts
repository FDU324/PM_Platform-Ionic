import {Injectable} from '@angular/core';
import {Moment} from "../models/moment";
import {User} from "../models/user";
import {Game} from "../models/game";

@Injectable()
export class MomentService {
    moments: Moment[];
    observers: any[];

    constructor() {
        this.moments = this.mockMoments();
        this.observers = [];
    }

    mockMoments(): Moment[] {
        const friend1 = new User('oneTest', '一号测试员', 'assets/icon/favicon.ico', '北京市-北京市-东城区');
        const game1 = new Game(0, '坦克大战', 'assets/icon/favicon.ico', 'assets/icon/favicon.ico', '新奇的双人合作坦克手游', '射击', 'downloadLink');
        return [
            new Moment("sdfa", friend1, game1, Date.now(), '哈哈哈俗话说得好', 'assets/icon/favicon.ico'),
        ];
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
