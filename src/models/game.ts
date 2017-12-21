/**
 * Created by kevintestt on 2017/12/10.
 */
export class Game {
    constructor(
        public id: number,
        public name: string,
        public icon: string,
        public image: string,
        public description: string,
        public category: string,
        public downloadLink: string,
        public packageName: string) {
    }
}
