"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhone = exports.updateEmail = exports.verifyUpdateOtp = exports.sendUpdateOtp = exports.updateUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.updateUserValidator = [
    (0, express_validator_1.body)("firstName")
        .optional()
        .isString()
        .withMessage("First name must be a string"),
    (0, express_validator_1.body)("lastName")
        .optional()
        .isString()
        .withMessage("Last name must be a string"),
    (0, express_validator_1.body)("profilePicture")
        .optional()
        .isURL()
        .withMessage("Profile picture must be a valid URL"),
    (0, express_validator_1.body)("firebaseClientId")
        .optional()
        .isString()
        .withMessage("Firebase client ID must be a string"),
    (0, express_validator_1.body)("username")
        .optional()
        .isString()
        .withMessage("Username must be a string"),
];
exports.sendUpdateOtp = [
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (!req.body.email &&
            (!req.body.phone ||
                (!req.body.phone.countryCode && !req.body.phone.number))) {
            throw new Error("Either email or phone details (country code and number) must be provided");
        }
        return true;
    }),
    (0, express_validator_1.body)("email")
        .optional()
        .isString()
        .withMessage("Email must be a string")
        .isEmail()
        .withMessage("Email must be a valid email")
        .notEmpty()
        .withMessage("Email must not be empty"),
    (0, express_validator_1.body)("phone.countryCode")
        .optional()
        .if((0, express_validator_1.body)("phone.number").exists())
        .isString()
        .withMessage("Country code must be a string")
        .trim()
        .notEmpty()
        .withMessage("Country code is required when phone number is provided"),
    (0, express_validator_1.body)("phone.number")
        .optional()
        .if((0, express_validator_1.body)("phone.countryCode").exists())
        .isString()
        .withMessage("Phone number must be a string")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required when country code is provided"),
];
exports.verifyUpdateOtp = [
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (!req.body.email && !req.body.phone) {
            throw new Error("Either email or phone details must be provided");
        }
        return true;
    }),
    (0, express_validator_1.body)("email")
        .optional()
        .isString()
        .withMessage("Email must be a string")
        .isEmail()
        .withMessage("Email must be a valid email")
        .notEmpty()
        .withMessage("Email must not be empty"),
    (0, express_validator_1.body)("phone.countryCode")
        .optional()
        .if((0, express_validator_1.body)("phone.number").exists())
        .isString()
        .withMessage("Country code must be a string")
        .trim()
        .notEmpty()
        .withMessage("Country code is required when phone number is provided"),
    (0, express_validator_1.body)("phone.number")
        .optional()
        .if((0, express_validator_1.body)("phone.countryCode").exists())
        .isString()
        .withMessage("Phone number must be a string")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required when country code is provided"),
    (0, express_validator_1.body)("otp")
        .isNumeric()
        .withMessage("otp must be a numeric string")
        .notEmpty()
        .withMessage("otp must not be empty"),
];
exports.updateEmail = [
    (0, express_validator_1.body)("email")
        .isString()
        .withMessage("Email must be a string")
        .isEmail()
        .withMessage("Email must be a valid email")
        .notEmpty()
        .withMessage("Email must not be empty"),
    (0, express_validator_1.body)("otp")
        .isNumeric()
        .withMessage("otp must be a numeric string")
        .notEmpty()
        .withMessage("otp must not be empty"),
];
exports.updatePhone = [
    (0, express_validator_1.body)("phone.countryCode")
        .isString()
        .withMessage("Country code must be a string")
        .trim()
        .notEmpty()
        .withMessage("Country code is required"),
    (0, express_validator_1.body)("phone.number")
        .isString()
        .withMessage("Phone number must be a string")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),
    (0, express_validator_1.body)("otp")
        .isNumeric()
        .withMessage("otp must be a numeric string")
        .notEmpty()
        .withMessage("otp must not be empty"),
];
//# sourceMappingURL=user.validator.js.map