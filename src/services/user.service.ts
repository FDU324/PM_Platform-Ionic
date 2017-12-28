import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user';

@Injectable()
export class UserService {
    currentUser: User;

    constructor() {
        this.currentUser = new User('Me', '123@me.com', 'Who am I', 'http://120.25.238.161/PM/platform/userImg/0.jpg');
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    setCurrentUser(user: User): void {
        this.currentUser = user;
    }


}
