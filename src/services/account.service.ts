import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';

@Injectable()
export class AccountService {
    currentUser: User;

    constructor(public http: HttpClient, ) {
        this.currentUser = new User('Me', 'Who am I', 'assets/icon/favicon.ico');
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    setCurrentUser(user: User): void {
        this.currentUser = user;
    }


    login(username: string, password: string) {
        return Promise.resolve('success');
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // let url = 'http://120.25.238.161:3000/user/login';
        // let info = {
        //     username: username,
        //     password: password,
        // };

        // return this.http.post(url, JSON.stringify(info), options)
        //     .toPromise()
        //     .then((res) => {
        //         if (res.json().data === 'success') {
        //             let infoGet = JSON.parse(res.json().user);
        //             //let groups = [];
        //             let groupInfo = JSON.parse(infoGet.groups);
        //             let user = new User(infoGet.username, infoGet.nickname, infoGet.userImage, infoGet.location, groupInfo);

        //             return this.socketService.socketConnect().then(data => {
        //                 if (data === 'success') {
        //                     return this.socketService.emitPromise('login', infoGet.username).then((data) => {
        //                         if (data === 'success') {
        //                             // 更新所有service的变量
        //                             let updateAll = [
        //                                 this.localUserService.setLocalUser(user),
        //                                 this.friendListService.updateAfterLogin(),
        //                                 this.chatService.updateAfterLogin(),
        //                                 this.momentService.updateAfterLogin(),
        //                             ];

        //                             return Promise.all(updateAll).then(data => {
        //                                 console.log('update all services success');
        //                                 return Promise.resolve(user);
        //                             });
        //                         }
        //                         return Promise.resolve('SignupLoginService-login-error');
        //                     }).catch(error => {
        //                         console.log('SignupLoginService-login:', error);
        //                         return Promise.resolve('SignupLoginService-login-error');
        //                     });
        //                 } else {
        //                     return Promise.resolve('SignupLoginService-login-error');
        //                 }
        //             });
        //         } else {
        //             return Promise.resolve('error');
        //         }
        //     }).catch((error) => {
        //         console.log('SignupLoginService-login', error);
        //         return Promise.resolve('error');
        //     });
    }

    signUp(username, password, nickname, userImage, location) {
        return Promise.resolve('success');
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // let url = 'http://120.25.238.161:3000/user/addUser';
        // let user = {
        //     username: username,
        //     password: password,
        //     nickname: nickname,
        //     userImage: userImage,
        //     location: location,
        // };

        // return this.http.post(url, JSON.stringify(user), options)
        //     .toPromise()
        //     .then((res) => {
        //         if (res.json().data === 'success') {
        //             return Promise.resolve('success');
        //         } else {
        //             return Promise.resolve('error');
        //         }
        //     }).catch((error) => {
        //         console.log('SignupLoginService-signup', error);
        //     });

    }


}
