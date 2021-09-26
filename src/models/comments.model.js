"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize_2 = __importDefault(require("../utils/sequelize"));
var Comment = sequelize_2.default.define("Comment", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movieId: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    movieTitle: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    commenterIp: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            max: {
                args: [500],
                msg: "Comment exceed limit",
            },
        },
    },
});
exports.default = Comment;
