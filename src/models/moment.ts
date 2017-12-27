import {User} from "./user";

export class Moment {
    constructor(public user: User,
                public time: number,
                public image: string,
                public game: string,) {
    }
}
