"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var movies_controllers_1 = require("../controllers/movies.controllers");
// mini router app
var moviesRoutes = express_1.Router();
// movies list route
moviesRoutes.route("/movies").get(movies_controllers_1.listMovies);
// find a movie
moviesRoutes.route("/movies/:movieId").get(movies_controllers_1.readMovie);
// characters of a movie
moviesRoutes.route("/movies/:movieId/characters").get(movies_controllers_1.listCharacters);
// comment on a move
moviesRoutes.route("/movies/:movieId/comments").post(movies_controllers_1.createComment);
// map param to handlers
moviesRoutes.param("movieId", movies_controllers_1.mapMovie);
exports.default = moviesRoutes;
