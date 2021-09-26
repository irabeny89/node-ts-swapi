"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("./utils/express"));
var config_1 = __importDefault(require("./config"));
var host = config_1.default.host, port = config_1.default.port;
// start the server using config settings
express_1.default.listen(port, function () { return console.log('server up: %s', host + ":" + port); });
