/**
 * Created by kevintestt on 2017/12/10.
 */
import {Game} from "./game";

export class Item {
    constructor(
        public id: number,
        public game: Game,
        public name: string,
        public icon: string,
        public description: string,
        public price: number) {
    }
}
