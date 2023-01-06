export class Movie {

  public constructor(id: string, name: string) {
    this.movie_id = id;
    this.movie_name = name;
  }
  movie_id: string | undefined;
  movie_name: string| undefined;
}
