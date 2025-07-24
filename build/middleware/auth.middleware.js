"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const variables_config_1 = require("../config/variables.config");
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send({
            success: false,
            message: "Auth header is empty",
        });
    }
    const tokenSecret = variables_config_1.ACCESS_TOKEN_SECRET;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return;
    if (!tokenSecret)
        return;
    jsonwebtoken_1.default.verify(token, variables_config_1.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).send({
                success: false,
                message: "Authentication failed",
            });
        }
        //@ts-ignore
        req.user = user;
        next();
    });
};
exports.default = authentication;
//# sourceMappingURL=auth.middleware.js.map