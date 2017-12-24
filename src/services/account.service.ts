import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user';
import {SocketService} from "./socket.service";
import {FriendService} from "./friend.service";
import {MomentService} from "./moment.service";

@Injectable()
export class AccountService {
    currentUser: User;

    constructor(public http: HttpClient,
                public socketService: SocketService,
                public friendService: FriendService,
                public momentService: MomentService) {
        this.currentUser = new User('Me', '123@me.com', 'Who am I', 'assets/icon/favicon.ico');
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    setCurrentUser(user: User): void {
        this.currentUser = user;
    }


    login(username: string, password: string) {
        const body = {
            username: username,
            password: password,
        };

        return this.http.post('http://localhost:1337/user/login', body, {responseType: 'text'}).toPromise().then(data => {
            if (data === 'fail') {
                return Promise.reject('fail');
            }

            const dataJson = JSON.parse(data);
            const user = new User(dataJson['Username'], dataJson['PrivateInfo']['Email'], dataJson['TitleInfo']['DisplayName'], 'assets/icon/favicon.ico');

            const updateAll = [
                this.setCurrentUser(user),
                // this.friendService.updateAfterLogin(),
                // this.chatService.updateAfterLogin(),
                // this.momentService.updateAfterLogin(),
            ];

            return Promise.all(updateAll).then(data => {
                console.log('update all services success');
                return Promise.resolve(user);
            }).catch(err => {
                console.log(err);
                return Promise.reject('error');
            });


            // return this.socketService.socketConnect().then(data => {
            //     if (data !== 'success') {
            //         return Promise.reject('AccountService-login-error');
            //     }
            //
            //     return this.socketService.emitPromise('login', user.username).then((data) => {
            //         if (data === 'success') {
            //             // 更新所有service的变量
            //             const updateAll = [
            //                 this.setCurrentUser(user),
            //                 this.friendService.updateAfterLogin(),
            //                 // this.chatService.updateAfterLogin(),
            //                 this.momentService.updateAfterLogin(),
            //             ];
            //
            //             return Promise.all(updateAll).then(data => {
            //                 console.log('update all services success');
            //                 return Promise.resolve(user);
            //             });
            //         }
            //         return Promise.reject('AccountService-login-error');
            //     }).catch(err => {
            //         console.log(`AccountService-login-error: ${err}`);
            //         return Promise.reject('error');
            //     });
            // });
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

        return this.http.post('http://localhost:1337/user/reg', body, {responseType: 'text'}).toPromise().then(data => {
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
