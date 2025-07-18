import express from "express";
import authentication from "../middleware/auth.middleware";
import {
  forgotPasswordSchema,
  generateAccessTokenSchema,
  loginSchema,
  resendOtpSchema,
  resetPasswordSchema,
  signupSchema,
  verifyOtpSchema,
  verifyPasswordOtpSchema,
} from "../validators/auth.validator";
import validator from "../middleware/validator.middleware";
import authController from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/signup", signupSchema, validator, authController.signup);
// authRouter.post("/login", loginSchema, validator, authController.login);
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
