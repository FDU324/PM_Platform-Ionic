export class Message {
    constructor(
        public from: string,    // receive send
        public type: string,    // text, images, maps-locations, moment
        public content,
        public time: number, ) {
    }
}