import { Optional, Model } from "sequelize";

type RequestQueryType = {
  sort?: Exclude<
    keyof CharacterType,
    "films" | "species" | "vehicles" | "starships"
  >;
  order?: "asc" | "desc";
  filter?: "male" | "female";
};

type CharacterType = {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

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
};

type FilmFullCharacterType = Omit<FilmType, "characters"> & {
  characters: CharacterType;
};

type FilmsType = {
  count: number;
  next: any;
  previous: any;
  results: FilmType[];
};

interface CommentType extends Model {
  id: number;
  movieId: string;
  movieTitle: string;
  commenterIp: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
