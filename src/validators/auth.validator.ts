import { body } from "express-validator";

export const signupSchema = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .trim()
    .notEmpty()
    .withMessage("Email is required"),

  body("businessName")
    .isString()
    .withMessage("Business name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Business name is required"),

  body("phone")
    .isMobilePhone("any", { strictMode: true })
    .withMessage("Phone number must be a valid mobile phone number")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),

  body("industry")
    .isString()
    .withMessage("Industry must be a string")
    .trim()
    .notEmpty()
    .withMessage("Industry is required"),
];

export const loginSchema = [
  body().custom((body) => {
    if (body.email && body.phone) {
      throw new Error("Please provide either email or phone, not both");
    }
    if (!body.email && !body.phone) {
      throw new Error("Please provide either email or phone");
    }
    return true;
  }),

  body("email")
    .if(body("email").exists())
    .isEmail()
    .withMessage("Email must be a valid email address")
    .trim(),

  body("phone")
    .if(body("phone").exists())
    .isMobilePhone("any", { strictMode: true })
    .withMessage("Phone number must be a valid mobile phone number")
    .trim(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .notEmpty()
    .withMessage("Password is required."),
];

export const resendOtpSchema = [
  body("email")
    .isBoolean()
    .withMessage("Email must be a boolean")
    .notEmpty()
    .withMessage("Email is required"),
];

export const verifyOtpSchema = [
  body("otp")
    .isNumeric()
    .withMessage("OTP must be a numeric string")
    .trim()
    .notEmpty()
    .withMessage("OTP is required"),
];

export const forgotPasswordSchema = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .trim()
    .notEmpty()
    .withMessage("Email is required"),
];

export const verifyPasswordOtpSchema = [
  body("otp")
    .isNumeric()
    .withMessage("OTP must be a numeric string")
    .trim()
    .notEmpty()
    .withMessage("OTP is required"),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .trim()
    .notEmpty()
    .withMessage("Email is required"),
];

export const resetPasswordSchema = [
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
];

export const generateAccessTokenSchema = [
  body("token")
    .isString()
    .withMessage("Token must be a string")
    .trim()
    .notEmpty()
    .withMessage("Token is required"),
];
