import { Message } from './message';
import { User } from './user';

export class Session {
    constructor(
        public friend: User,
        public messageList: Message[],
        public newMessageCount) {
    }
}