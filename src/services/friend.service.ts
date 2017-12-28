import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Session} from '../models/session';
import {User} from '../models/user';
import {Message} from '../models/message';

import {SocketService} from './socket.service';
import {MomentService} from "./moment.service";

@Injectable()
export class FriendService {
    currentUser: User;
    sessions: Session[];
    observers: any[];
    friendReqList: User[];
    newMessageCount: number;


    constructor(public socketService: SocketService,
                public momentService: MomentService,
                public http: HttpClient) {
        this.sessions = [];
        this.observers = [];
        this.friendReqList = [
            new User('newOne', '123@me.com', '新来的', 'assets/icon/favicon.ico'),
        ];
    }


    updateAfterLogin() {
        this.observers = [];

        this.sessions = [];
        this.friendReqList = [];
        this.newMessageCount = 0;

        this.receiveSocketOn();
    }

    receiveSocketOn() {
        this.socketService.getSocket().on('newFriend', (user) => {
            const session = new Session(JSON.parse(user), [], 0);
            this.sessions.unshift(session);
            this.updatePages();
            // this.momentService.updateMoment(true);
        });

        this.socketService.getSocket().on('newMessage', (messageStr) => {
            const data = JSON.parse(messageStr);
            console.log("new message!");
            console.log(data);
            
            let session = this.sessions.find(session => session.friend.username === data.from);
            console.log(session.friend.username);
            session.messages.unshift(new Message('receive', 'text', data.content, data.time));
            session.newMessageCount++;
            this.updatePages();
            this.newMessageCount++;
        });
    }

    getTotalNewMessageCount(): number {
        return this.newMessageCount;
    }

    mockSessions(): Session[] {
        const ret: Session[] = [];
        const friend1 = new User('oneTest', '123@me.com', '一号测试员', 'assets/icon/favicon.ico');
        const friend2 = new User('twoTest', '123@me.com', '二号测试员', 'assets/icon/favicon.ico');

        const message1: Message[] = [];
        const message2: Message[] = [];
        for (let i = 0; i < 10; i++) {
            const message = new Message('receive', 'text', `测试数据${i}`, Date.now());
            message1.push(message);
            message2.push(message);
        }
        const session1 = new Session(friend1, message1, 0);
        const session2 = new Session(friend2, message2, 0);
        ret.push(session1);
        ret.push(session2);
        return ret;
    }

    getSessionByFriend(friend: User): Session {
        return this.sessions.find(s => s.friend.username === friend.username);
    }

    getSessions(): Session[] {
        return this.sessions;
    }

    clearNewMessages(session: Session) {

    }

    registerPage(page: any) {
        this.observers.push(page);
    }

    removePage(page: any) {
        this.observers.splice(this.observers.indexOf(page), 1);
    }

    updatePages() {
        this.observers.forEach(page => page.update());
    }

    sendMessage(user: User, friend: User, type: string, content) {
        const message = new Message(user.username, type, content, Date.now());

        //console.log(content);
        //console.log(this.sessionList);
        //console.log(friend);
        const sendData = {
            from: user.username,
            to: friend.username,
            message: message
        };

        console.log(sendData);

        return this.socketService.emitPromise('sendMessage', JSON.stringify(sendData)).then((data) => {
            if (data === 'success') {
                let temSession = this.sessions.find((item) => item.friend.username === friend.username);
                if (temSession === undefined) {
                    let newSession = new Session(friend, [message], 0);
                    temSession = newSession;
                    this.sessions.unshift(newSession);
                } else {
                    temSession.messages.push(message);
                }
                return Promise.resolve<any>(temSession);
            }
            else if (data === 'refuse') {
                return Promise.resolve(data);
            }
            return Promise.resolve<any>('SendMessage-error');
        }).catch(error => {
            console.log('SendMessage-error:', error);
            return Promise.resolve<any>('SendMessage-error');
        });
    }

    addFriend(myUsername: string, friendUsername: string) {
        const body = {
            myUsername: myUsername,
            friendUsername: friendUsername
        };
        // const friend2 = new User('测试添加', '123@me.com', '测试添加', 'assets/icon/favicon.ico');

        // this.sessions.push(new Session(friend2, [new Message('receive', 'text', `测试数据`, Date.now())], 0));

        // return Promise.resolve('success');


        return this.http.post('http://localhost:1337/friend/addFriend', body, {responseType: 'text'}).toPromise().then(res => {
            if (res === 'fail') {
                return Promise.reject('fail');
            }
        
            const data = JSON.parse(res);
            const friend2 = new User(friendUsername, "mock@email.com", data.friendNickname, 'assets/icon/favicon.ico');
        
            this.sessions.push(new Session(friend2, [new Message(friend2.nickname, 'text', `成功添加好友`, Date.now())], 0));
        
            return Promise.resolve('success');
        
        }).catch(err => {
            console.log('FriendService:' + err);
            return Promise.reject('fail');
        });
    }

    searchUser(myUsername: string, friendUsername: string) {
        // return Promise.resolve('success');

        const url = 'http://120.25.238.161:3000/user/findUser?myUsername=' + myUsername + '&friendUsername=' + friendUsername;
        return this.http.get(url, {responseType: 'text'}).toPromise().then(res => {
            if (res === 'success') {
                // 可以添加
                const temp = {
                    myUsername: myUsername,
                    friendUsername: friendUsername
                };

                return this.socketService.emitPromise('friendReq', JSON.stringify(temp)).then(data => {
                    return Promise.resolve('success');
                });
            } else if (res === 'friend') {
                // 已经是好友
                return Promise.resolve('friend');
            } else if (res === 'notExist') {
                // 该好友不存在
                return Promise.resolve('notExist');
            } else {
                // 服务器错误
                console.log('FriendListService-searchUser:', res);
                return Promise.reject('FriendListService-searchUser:');
            }

        }).catch(error => {
            console.log(error);
            return Promise.reject('FriendListService-searchUser:');
        });


    }

    getFriendRequests(): User[] {
        return this.friendReqList;
    }

    acceptRequest(currentUser: string, searchUser: string) {

    }
}
