"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessTokenSchema = exports.resetPasswordSchema = exports.verifyPasswordOtpSchema = exports.forgotPasswordSchema = exports.verifyOtpSchema = exports.resendOtpSchema = exports.loginSchema = exports.signupSchema = void 0;
const express_validator_1 = require("express-validator");
exports.signupSchema = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .trim()
        .notEmpty()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("businessName")
        .isString()
        .withMessage("Business name must be a string")
        .trim()
        .notEmpty()
        .withMessage("Business name is required"),
    (0, express_validator_1.body)("phone")
        .isMobilePhone("any", { strictMode: true })
        .withMessage("Phone number must be a valid mobile phone number")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
    (0, express_validator_1.body)("industry")
        .isString()
        .withMessage("Industry must be a string")
        .trim()
        .notEmpty()
        .withMessage("Industry is required"),
];
exports.loginSchema = [
    (0, express_validator_1.body)().custom((body) => {
        if (body.email && body.phone) {
            throw new Error("Please provide either email or phone, not both");
        }
        if (!body.email && !body.phone) {
            throw new Error("Please provide either email or phone");
        }
        return true;
    }),
    (0, express_validator_1.body)("email")
        .if((0, express_validator_1.body)("email").exists())
        .isEmail()
        .withMessage("Email must be a valid email address")
        .trim(),
    (0, express_validator_1.body)("phone")
        .if((0, express_validator_1.body)("phone").exists())
        .isMobilePhone("any", { strictMode: true })
        .withMessage("Phone number must be a valid mobile phone number")
        .trim(),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string")
        .trim()
        .notEmpty()
        .withMessage("Password is required."),
];
exports.resendOtpSchema = [
    (0, express_validator_1.body)("email")
        .isBoolean()
        .withMessage("Email must be a boolean")
        .notEmpty()
        .withMessage("Email is required"),
];
exports.verifyOtpSchema = [
    (0, express_validator_1.body)("otp")
        .isNumeric()
        .withMessage("OTP must be a numeric string")
        .trim()
        .notEmpty()
        .withMessage("OTP is required"),
];
exports.forgotPasswordSchema = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .trim()
        .notEmpty()
        .withMessage("Email is required"),
];
exports.verifyPasswordOtpSchema = [
    (0, express_validator_1.body)("otp")
        .isNumeric()
        .withMessage("OTP must be a numeric string")
        .trim()
        .notEmpty()
        .withMessage("OTP is required"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .trim()
        .notEmpty()
        .withMessage("Email is required"),
];
exports.resetPasswordSchema = [
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
];
exports.generateAccessTokenSchema = [
    (0, express_validator_1.body)("token")
        .isString()
        .withMessage("Token must be a string")
        .trim()
        .notEmpty()
        .withMessage("Token is required"),
];
//# sourceMappingURL=auth.validator.js.map