/**
 * Created by kevintestt on 2017/12/10.
 */

export class Item {
    constructor(
        public id: string,
        public name: string,
        public currency: string,
        public price: number,
        public store: number,
        public icon: string,
        public description: Object) {
    }
}
