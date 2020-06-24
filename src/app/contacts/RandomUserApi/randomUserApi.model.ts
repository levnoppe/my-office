export interface Contact {
  results: [
    {
      gender?: string,
      name?: {
        title?: string,
        first?: string,
        last?: string
      },
      location?: {
          street?: {
            name?: string,
            number?: string
          },
        city?: string ,
        state?: string ,
        postcode?: string ,
        coordinates?: {
          latitude?: number ,
          longitude?: number
        },
        timezone?: {
          offset?: number ,
          description?: string
        }
      },
      email?: string ,
      login?: {
        uuid?: string ,
        username?: string ,
        password?: string ,
        salt?: string ,
        md5?: string ,
        sha1?: string ,
        sha256?: string
      },
      dob?: {
        date?: string ,
        age?: number
      },
      registered?: {
        date?: string ,
        age?: string
      },
      phone?: string ,
      cell?: string ,
      id?: {
        name?: string ,
        value?: string
      },
      picture?: {
        large?: string ,
        medium?: string ,
        thumbnail?: string
      },
      nat?: string
    }
  ];
  id?: string;

  // info?: {
  //   seed?: string ,
  //   results?: number,
  //   page?: number,
  //   version?: string
  // };

}
