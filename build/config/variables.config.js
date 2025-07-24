"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_SECRET = exports.API_KEY = exports.CLOUD_NAME = exports.REFRESH_TOKEN_EXPIRY_TIME = exports.TOKEN_EXPIRY_TIME = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.DATABASE_URL = exports.AUTH_PASS = exports.AUTH_MAIL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.AUTH_MAIL = process.env.AUTH_MAIL;
exports.AUTH_PASS = process.env.AUTH_PASS;
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
exports.TOKEN_EXPIRY_TIME = process.env.TOKEN_EXPIRY_TIME;
exports.REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME;
exports.CLOUD_NAME = process.env.CLOUD_NAME;
exports.API_KEY = process.env.API_KEY;
exports.API_SECRET = process.env.API_SECRET;
//# sourceMappingURL=variables.config.js.map