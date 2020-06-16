export interface Article {
  author?: string;
  name?: string;
  description?: string;
  url?: string;
  image?: { thumbnail: { contentUrl: string, height: string, width: string } };
  datePublished?: Date;
  content?: string;
  id?: string;
  provider: [{
    image: {
      thumbnail: {
        contentUrl: string;
      }
    },
    name: string
  }];
}
