import { Message } from './message';
import { User } from './user';

export class Session {
    constructor(
        public friend: User,
        public messages: Message[],
        public newMessageCount) {
    }
}