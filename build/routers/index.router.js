"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./auth.router");
// import { userRouter } from "./user.router";
const router = express_1.default.Router();
router.use("/auth", auth_router_1.authRouter);
// router.use("/user", userRouter);
exports.default = router;
//# sourceMappingURL=index.router.js.map