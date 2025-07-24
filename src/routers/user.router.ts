import { Router } from "express";
import userController from "../controllers/user.controller";
import authentication from "../middleware/auth.middleware";
// import {
//   updateEmail,
//   updatePhone,
//   updateUserValidator,
//   sendUpdateOtp,
//   verifyUpdateOtp,
// } from "../validators/user.validator";
// import validator from "../middleware/validator.middleware";

export const userRouter = Router();

userRouter.post("/upload/:fileType", authentication, userController.upload);
userRouter.get("/profile", authentication, userController.getProfile);
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
