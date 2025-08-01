"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_router_1 = __importDefault(require("../routers/index.router"));
const middleware = (app) => {
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use("/api/v1", index_router_1.default);
    app.use(/(.*)/, (req, res) => {
        console.info("Route not found");
        return res.status(404).send("Route not found");
    });
};
exports.default = middleware;
//# sourceMappingURL=index.middleware.js.map