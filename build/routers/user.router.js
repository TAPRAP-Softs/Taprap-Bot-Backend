"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
// import {
//   updateEmail,
//   updatePhone,
//   updateUserValidator,
//   sendUpdateOtp,
//   verifyUpdateOtp,
// } from "../validators/user.validator";
// import validator from "../middleware/validator.middleware";
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/upload/:fileType", auth_middleware_1.default, user_controller_1.default.upload);
exports.userRouter.get("/profile", auth_middleware_1.default, user_controller_1.default.getProfile);
// userRouter.patch(
//   "/update",
//   authentication,
//   updateUserValidator,
//   validator,
//   userController.updateUser
// );
// userRouter.post(
//   "/send-update-otp",
//   authentication,
//   sendUpdateOtp,
//   validator,
//   userController.sendUpdateOtp
// );
// userRouter.post(
//   "/verify-update-otp",
//   authentication,
//   verifyUpdateOtp,
//   validator,
//   userController.verifyUpdateOtp
// );
// userRouter.patch(
//   "/update-email",
//   authentication,
//   updateEmail,
//   validator,
//   userController.updateEmail
// );
// userRouter.patch(
//   "/update-phone",
//   authentication,
//   updatePhone,
//   validator,
//   userController.updatePhone
// );
//# sourceMappingURL=user.router.js.map