"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var movies_routes_1 = __importDefault(require("../routes/movies.routes"));
// express app instance
var app = express_1.default();
// helper middlewares
app.use(morgan_1.default("dev"));
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// movies routes middleware
app.use("/api", movies_routes_1.default);
// error middleware
app.use(function (err, _req, res) {
    if (err)
        return res.status(400).json(err);
});
exports.default = app;
