# dev-SWAPI-io

## Summary

Simple Star Wars API to query and comment on specific films. 

The data is fetched from [SWAPI](https://swapi.py4e.com/)

## How to start

Install the dependencies and then run `pnpm dev` to start the local server.

You can test the endpoints using CURL, Postman, Rest Client.

I used Rest Client and you can check and run the tests using the `swapi-test.rest` file at the root of the directory.

### Note

- [PNPM](https://pnpm.io) package manager was used during development but you can use any other one of your choice(eg NPM or Yarn). If you intend to use other package manager please ``delete`` the `pnpm-lock.yaml` and the `node_modules` files and then run install with your package manager of choice. Eg. `npm install`

- To use the `Rest Client` to test the endpoints you need to install the extension. I used VS Code and it was installed from there.

## Documentation

type FilmType = {
  id: string;
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

type CommentType = {
  id: string;
  movieId: string;
  movieTitle: string;
  commenterIp: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

### Endpoints

If you are connected it will use the live server([dev-swapi-io](https://dev-swapi-io.herokuapp.com/)) else  it uses the local server.

#### Get all movies
`GET http://localhost:4000/api/movies`

Response: {
  moviesCount: number,
  movies: FilmType[],
  commentsCount: number,
  comments: CommentType,
}

#### Get a movie
`GET http://localhost:4000/api/movies/1`

Parameter: movie id

Response: {
  movie: FilmType,
  comments: currentMovieComments,
  commentsCount: number,
}

#### Comment on a movie
`POST http://localhost:4000/api/movies/1/comments`
Content-Type: application/json

Request body:
{
  "comment": "Test comment 2"
}

Response: CommentType

#### Get characters in a movie
`GET http://localhost:4000/api/movies/1/characters?sort=height&order=desc`

Query fields and values:

 sort: "name" | "height" | "mass" | "hair_color" | "skin_color" | "eye_color" | "birth_year" | "gender" | "homeworld"

 order: "asc" | "desc"

Response: CharacterType[]
