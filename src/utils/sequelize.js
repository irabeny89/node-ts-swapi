"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
// sqlite local database instance
var sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./src/models/database.sqlite3"
});
exports.default = sequelize;
