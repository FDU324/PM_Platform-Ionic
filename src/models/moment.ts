import {User} from "./user";
import {Game} from "./game";

export class Moment {
    constructor(
        public id: string,
        public user: User,
        public game: Game,
        public time: number,
        public title: string,
        public image: string, ) {
    }
}
