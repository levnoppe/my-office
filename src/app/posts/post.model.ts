export class Post {
  date: Date;
  title: string;
  body: string;
  publicState: boolean;
  id?: string;

  constructor(date: Date, title: string, body: string, publicState: boolean, id?: string) {
    this.date = date;
    this.title = title;
    this.body = body;
    this.publicState = publicState;
    this.id = id;
  }
}
