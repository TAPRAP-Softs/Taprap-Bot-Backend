"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_validator_1 = require("../validators/auth.validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/signup", auth_validator_1.signupSchema, validator_middleware_1.default, auth_controller_1.default.signup);
exports.authRouter.post("/login", auth_validator_1.loginSchema, validator_middleware_1.default, auth_controller_1.default.login);
// authRouter.post(
//   "/resend-otp",
//   authentication,
//   resendOtpSchema,
//   validator,
//   authController.resendOtp
// );
// authRouter.post(
//   "/generate-access-token",
//   generateAccessTokenSchema,
//   validator,
//   authController.generateAccessToken
// );
// authRouter.post(
//   "/verify-otp",
//   authentication,
//   verifyOtpSchema,
//   validator,
//   authController.verifyOtp
// );
// authRouter.post(
//   "/forgot-password",
//   forgotPasswordSchema,
//   validator,
//   authController.forgotPassword
// );
// authRouter.post(
//   "/verify-password-otp",
//   verifyPasswordOtpSchema,
//   validator,
//   authController.verifyOtpForPasswordReset
// );
// authRouter.post(
//   "/reset-password",
//   authentication,
//   resetPasswordSchema,
//   validator,
//   authController.resetPassword
// );
//# sourceMappingURL=auth.router.js.map