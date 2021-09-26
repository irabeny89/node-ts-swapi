import { RequestHandler, RequestParamHandler } from "express";
import { swapi } from "../utils/swapi";
import type {
  CharacterType,
  CommentType,
  FilmFullCharacterType,
  FilmsType,
  FilmType,
  RequestQueryType,
} from "../types";
import sequelize from "../utils/sequelize";
import Comment from "../models/comments.model";
import axios from "axios";

const getComments = async () => {
  try {
    await sequelize.sync({ alter: true });
    const commentsResult = sequelize.models.Comment
      ? await sequelize.models.Comment.findAndCountAll()
      : { rows: [], count: 0 };

    return commentsResult as {
      rows: CommentType[];
      count: number;
    };
  } catch (error) {
    throw error;
  }
};

const getOrderedComment = (comments: CommentType[]) =>
  comments
    .map((comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt!).toUTCString(),
      updatedAt: new Date(comment.updatedAt!).toUTCString(),
    }))
    .sort(({ createdAt: t1 }, { createdAt: t2 }) =>
      new Date(t1).getTime() < new Date(t2).getTime() ? 1 : -1
    );

const getMoviesFilteredData = (movies: FilmType[]) =>
  movies.map(({ title, opening_crawl, characters }) => ({
    title,
    openingCrawl: opening_crawl,
    characters,
  }));

export const listMovies: RequestHandler = async (_, res, next) => {
  try {
    // get comments
    const { count: commentsCount, rows } = await getComments();
    // order and sort comments
    const comments = getOrderedComment(rows);
    // get movie list from swapi
    const {
      data: { count: moviesCount, results: movies },
    } = await swapi.get<FilmsType>("/films");
    // respond and exit
    return res.json({
      moviesCount,
      movies,
      commentsCount,
      comments,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const mapMovie: RequestParamHandler = async (_, res, next, id) => {
  try {
    const {
      data: { characters, ...rest },
    } = await swapi.get<FilmType>(`/films/${id}`);

    const promiseCharacters = characters.map(
      async (url) => (await axios.get<CharacterType>(url)).data
    );

    const fullCharactersData = await Promise.all(promiseCharacters);

    res.locals.moviePopulated = {
      ...rest,
      id,
      characters: fullCharactersData,
    };

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const readMovie: RequestHandler = async (_, res, next) => {
  try {
    // @ts-ignore
    const moviePopulated = res.locals.moviePopulated as FilmFullCharacterType;

    // get comments
    const { rows: movieComments } = await getComments();
    // filter out comments in reversed chronologically ordered
    const currentMovieComments = getOrderedComment(
      movieComments.filter(
        ({ movieTitle }) => movieTitle === moviePopulated.title
      )
    );

    return res.json({
      movie: moviePopulated,
      comments: currentMovieComments,
      commentsCount: currentMovieComments.length,
    });
  } catch (error) {
    next(error);
  }
};

export const createComment: RequestHandler = async (
  { body, ip },
  res,
  next
) => {
  const { title: movieTitle, id: movieId } = res.locals
    .moviePopulated as FilmFullCharacterType;
  try {
    await sequelize.sync({ alter: true });
    const comment = await Comment.create({
      comment: body.comment,
      movieTitle,
      movieId,
      commenterIp: ip,
    });
    return res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const listCharacters: RequestHandler = (req, res) => {
  // destructure query
  const { sort, order, filter } = req.query as RequestQueryType;
  const characters = res.locals.moviePopulated.characters as CharacterType[];
  // sort by field in descending order
  if (sort! in characters[0] && order == "desc")
    return res.json(
      characters.sort(({ [sort!]: first }, { [sort!]: second }) =>
        first.localeCompare(second) === -1 ? 1 : -1
      )
    );
  // sort by field in ascending order(also by default when order is undefined)
  if (sort! in characters[0] && (order == "asc" || order == undefined))
    return res.json(
      characters.sort(({ [sort!]: first }, { [sort!]: second }) =>
        first.localeCompare(second) === 1 ? 1 : -1
      )
    );
  // filter by gender
  if (filter!) {
    const filteredCharacters = characters.filter(
      ({ gender }) => gender == filter
    );
    // total height(cm & ft) of characters
    const totalHeightCm = filteredCharacters.reduce(
      (prev, { height }) => prev + +height,
      0
    );

    const totalHeightFt = totalHeightCm / 30;

    return res.json({
      characters: filteredCharacters,
      count: filteredCharacters.length,
      totalHeight: {
        totalHeightCm,
        totalHeightFt,
      },
    });
  }
  // when no query parameters
  return res.json(characters);
};
