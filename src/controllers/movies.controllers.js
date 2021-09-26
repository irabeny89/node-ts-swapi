"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCharacters = exports.createComment = exports.readMovie = exports.mapMovie = exports.listMovies = void 0;
var swapi_1 = __importDefault(require("../utils/swapi"));
var sequelize_1 = __importDefault(require("../utils/sequelize"));
var comments_model_1 = __importDefault(require("../models/comments.model"));
var axios_1 = __importDefault(require("axios"));
var getComments = function () { return __awaiter(void 0, void 0, void 0, function () {
    var commentsResult, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                return [4 /*yield*/, sequelize_1.default.sync({ alter: true })];
            case 1:
                _b.sent();
                if (!sequelize_1.default.models.Comment) return [3 /*break*/, 3];
                return [4 /*yield*/, sequelize_1.default.models.Comment.findAndCountAll()];
            case 2:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = { rows: [], count: 0 };
                _b.label = 4;
            case 4:
                commentsResult = _a;
                return [2 /*return*/, commentsResult];
            case 5:
                error_1 = _b.sent();
                throw error_1;
            case 6: return [2 /*return*/];
        }
    });
}); };
var getOrderedComment = function (comments) {
    return comments
        .map(function (comment) { return (__assign(__assign({}, comment), { createdAt: new Date(comment.createdAt).toUTCString(), updatedAt: new Date(comment.updatedAt).toUTCString() })); })
        .sort(function (_a, _b) {
        var t1 = _a.createdAt;
        var t2 = _b.createdAt;
        return new Date(t1).getTime() < new Date(t2).getTime() ? 1 : -1;
    });
};
var getMoviesFilteredData = function (movies) {
    return movies.map(function (_a) {
        var title = _a.title, opening_crawl = _a.opening_crawl, characters = _a.characters;
        return ({
            title: title,
            openingCrawl: opening_crawl,
            characters: characters,
        });
    });
};
var listMovies = function (_, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, commentsCount, rows, comments, _b, moviesCount, movies, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getComments()];
            case 1:
                _a = _c.sent(), commentsCount = _a.count, rows = _a.rows;
                comments = getOrderedComment(rows);
                return [4 /*yield*/, swapi_1.default.get("/films")];
            case 2:
                _b = (_c.sent()).data, moviesCount = _b.count, movies = _b.results;
                // respond and exit
                return [2 /*return*/, res.json({
                        moviesCount: moviesCount,
                        movies: movies,
                        commentsCount: commentsCount,
                        comments: comments,
                    })];
            case 3:
                error_2 = _c.sent();
                console.error(error_2);
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.listMovies = listMovies;
var mapMovie = function (_, res, next, id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, characters, rest, promiseCharacters, fullCharactersData, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, swapi_1.default.get("/films/" + id)];
            case 1:
                _a = (_b.sent()).data, characters = _a.characters, rest = __rest(_a, ["characters"]);
                promiseCharacters = characters.map(function (url) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios_1.default.get(url)];
                        case 1: return [2 /*return*/, (_a.sent()).data];
                    }
                }); }); });
                return [4 /*yield*/, Promise.all(promiseCharacters)];
            case 2:
                fullCharactersData = _b.sent();
                res.locals.moviePopulated = __assign(__assign({}, rest), { id: id, characters: fullCharactersData });
                next();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error(error_3);
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.mapMovie = mapMovie;
var readMovie = function (_, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var moviePopulated_1, movieComments, currentMovieComments, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                moviePopulated_1 = res.locals.moviePopulated;
                return [4 /*yield*/, getComments()];
            case 1:
                movieComments = (_a.sent()).rows;
                currentMovieComments = getOrderedComment(movieComments.filter(function (_a) {
                    var movieTitle = _a.movieTitle;
                    return movieTitle === moviePopulated_1.title;
                }));
                return [2 /*return*/, res.json({
                        movie: moviePopulated_1,
                        comments: currentMovieComments,
                        commentsCount: currentMovieComments.length,
                    })];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readMovie = readMovie;
var createComment = function (_a, res, next) {
    var body = _a.body, ip = _a.ip;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, movieTitle, movieId, comment, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = res.locals
                        .moviePopulated, movieTitle = _b.title, movieId = _b.id;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, sequelize_1.default.sync({ alter: true })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, comments_model_1.default.create({
                            comment: body.comment,
                            movieTitle: movieTitle,
                            movieId: movieId,
                            commenterIp: ip,
                        })];
                case 3:
                    comment = _c.sent();
                    return [2 /*return*/, res.json(comment)];
                case 4:
                    error_5 = _c.sent();
                    console.error(error_5);
                    next(error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.createComment = createComment;
var listCharacters = function (req, res) {
    // destructure query
    var _a = req.query, sort = _a.sort, order = _a.order, filter = _a.filter;
    var characters = res.locals.moviePopulated.characters;
    // sort by field in descending order
    if (sort in characters[0] && order == "desc")
        return res.json(characters.sort(function (_a, _b) {
            var _c = sort, first = _a[_c];
            var _d = sort, second = _b[_d];
            return first.localeCompare(second) === -1 ? 1 : -1;
        }));
    // sort by field in ascending order(also by default when order is undefined)
    if (sort in characters[0] && (order == "asc" || order == undefined))
        return res.json(characters.sort(function (_a, _b) {
            var _c = sort, first = _a[_c];
            var _d = sort, second = _b[_d];
            return first.localeCompare(second) === 1 ? 1 : -1;
        }));
    // filter by gender
    if (filter) {
        var filteredCharacters = characters.filter(function (_a) {
            var gender = _a.gender;
            return gender == filter;
        });
        // total height(cm & ft) of characters
        var totalHeightCm = filteredCharacters.reduce(function (prev, _a) {
            var height = _a.height;
            return prev + +height;
        }, 0);
        var totalHeightFt = totalHeightCm / 30;
        return res.json({
            characters: filteredCharacters,
            count: filteredCharacters.length,
            totalHeight: {
                totalHeightCm: totalHeightCm,
                totalHeightFt: totalHeightFt,
            },
        });
    }
    // when no query parameters
    return res.json(characters);
};
exports.listCharacters = listCharacters;
