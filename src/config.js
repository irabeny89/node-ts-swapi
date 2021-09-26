"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    host: process.env.NODE_ENV == "production"
        ? process.env.REMOTE_HOST
        : "http://localhost",
    port: process.env.PORT || 4000,
};
exports.default = config;
