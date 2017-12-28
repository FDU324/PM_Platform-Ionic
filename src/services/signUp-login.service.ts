import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { format } from 'util';

import {User} from '../models/user';

import {SocketService} from "./socket.service";
import {FriendService} from "./friend.service";
import {MomentService} from "./moment.service";
import {UserService} from "./user.service";



@Injectable()
export class SignUpLoginService {

    constructor(public http: HttpClient,
                public userService: UserService,
                public socketService: SocketService,
                public friendService: FriendService,
                public momentService: MomentService) {
    }

    login(username: string, password: string) {
        const body = {
            username: username,
            password: password,
        };

        // const friend2 = new User('测试登录', '123@me.com', '测试登录', 'assets/icon/favicon.ico');
        // this.userService.setCurrentUser(friend2);
        // this.momentService.updateAfterLogin();
        // return Promise.resolve(friend2);

        return this.http.post('http://localhost:1337/user/login', body, {responseType: 'text'}).toPromise().then(data => {
            if (data === 'fail') {
                return Promise.reject('fail');
            }

            const dataJson = JSON.parse(data);
            const user = new User(dataJson['Username'], dataJson['PrivateInfo']['Email'], dataJson['TitleInfo']['DisplayName'], 'http://120.25.238.161/PM/platform/userImg/0.jpg');

            // const updateAll = [
            //     this.userService.setCurrentUser(user),
            //     // this.friendService.updateAfterLogin(),
            //     // this.chatService.updateAfterLogin(),
            //     this.momentService.updateAfterLogin(),
            // ];

            // return Promise.all(updateAll).then(data => {
            //     console.log('update all services success');
            //     return Promise.resolve(user);
            // }).catch(err => {
            //     console.log(err);
            //     return Promise.reject('error');
            // });


            return this.socketService.socketConnect().then(data => {
                if (data !== 'success') {
                    return Promise.reject('AccountService-login-error');
                }

                return this.socketService.emitPromise('login', user.username).then((data) => {
                    if (data === 'success') {
                        console.log("connect socket");
                        // 更新所有service的变量
                        this.userService.setCurrentUser(user);
                        const updateAll = [
                            this.friendService.updateAfterLogin(),
                            // this.chatService.updateAfterLogin(),
                            this.momentService.updateAfterLogin(),
                        ];

                        return Promise.all(updateAll).then(data => {
                            console.log('update all services success');
                            return Promise.resolve(user);
                        });
                    }
                    return Promise.reject('AccountService-login-error');
                }).catch(err => {
                    console.log(`AccountService-login-error: ${err}`);
                    return Promise.reject('error');
                });
            });
        }).catch(err => {
            console.log('AccountService login error: ', err);
            return Promise.reject('error');
        });
    }

    signUp(username: string, email: string, password: string, nickname: string, userImage: string) {
        const body = {
            username: username,
            email: email,
            password: password,
            nickname: nickname,
            userImage: userImage,
        };

        return this.http.post('http://120.25.238.161:1337/user/reg', body, {responseType: 'text'}).toPromise().then(data => {
            if (data === 'success') {
                return Promise.resolve('success');
            } else {
                return Promise.reject('fail');
            }
        }).catch(err => {
            console.log('AccountService signUp error: ', err);
            return Promise.reject('error');
        });
    }


}
