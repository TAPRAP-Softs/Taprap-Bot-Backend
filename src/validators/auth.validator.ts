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

  body("phone.countryCode")
    .isString()
    .withMessage("Country code must be a string")
    .trim()
    .notEmpty()
    .withMessage("Country code is required"),

  body("phone.number")
    .isMobilePhone('any', { strictMode: true })
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
];

export const loginSchema = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .trim()
    .notEmpty()
    .withMessage("Email is required."),
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
