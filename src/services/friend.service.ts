import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Page } from 'ionic-angular/navigation/nav-util';
import { SocketService } from './socket.service';

@Injectable()
export class FriendService {
    sessions: Session[];
    observers: any[];
    friendRequestsNum: number;
    friendReqList: User[];

    constructor(public socketService: SocketService) {
        this.sessions = this.mockSessions();
        this.observers = [];
        this.friendRequestsNum = 1;
        this.friendReqList = [
            new User('newOne', '新来的', 'assets/icon/favicon.ico', '北京市-北京市-东城区'),
        ];
    }

    mockSessions(): Session[] {
        const ret: Session[] = [];
        const friend1 = new User('oneTest', '一号测试员', 'assets/icon/favicon.ico', '北京市-北京市-东城区');
        const friend2 = new User('twoTest', '二号测试员', 'assets/icon/favicon.ico', '北京市-北京市-东城区');

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
        let message = new Message('me', type, content, Date.now());

        //console.log(content);
        //console.log(this.sessionList);
        //console.log(friend);
        let sendData = {
            from: user.username,
            to: friend.username,
            message: message
        };

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
        //return Promise.resolve(temSession);
    }

    searchUser(currentUser: string, searchUser: string) {
        return Promise.resolve('success');
    }


    getFriendRequests(): User[] {
        return this.friendReqList;
    }

    clearFriendRequests() {
        this.friendRequestsNum = 0;
    }

    acceptRequest(currentUser: string, searchUser: string) {

    }
}