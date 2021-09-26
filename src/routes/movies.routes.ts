import { Router } from "express";
import {
  createComment,
  listCharacters,
  listMovies,
  mapMovie,
  readMovie,
} from "../controllers/movies.controllers";
// mini router app
const moviesRoutes = Router();
// movies list route
moviesRoutes.route("/movies").get(listMovies);
// find a movie
moviesRoutes.route("/movies/:movieId").get(readMovie);
// characters of a movie
moviesRoutes.route("/movies/:movieId/characters").get(listCharacters)
// comment on a move
moviesRoutes.route("/movies/:movieId/comments").post(createComment)
// map param to handlers
moviesRoutes.param("movieId", mapMovie);

export default moviesRoutes;
