export class User {
  constructor(public username: string,
              public nickname: string,
              public userImage?: string,
              public location?: string) {
  }
}