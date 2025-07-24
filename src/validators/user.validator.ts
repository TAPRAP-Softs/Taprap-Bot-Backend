import { body } from "express-validator";

export const updateUserValidator = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string"),
  body("profilePicture")
    .optional()
    .isURL()
    .withMessage("Profile picture must be a valid URL"),
  body("firebaseClientId")
    .optional()
    .isString()
    .withMessage("Firebase client ID must be a string"),
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string"),
];

export const sendUpdateOtp = [
  body().custom((value, { req }) => {
    if (
      !req.body.email &&
      (!req.body.phone ||
        (!req.body.phone.countryCode && !req.body.phone.number))
    ) {
      throw new Error(
        "Either email or phone details (country code and number) must be provided"
      );
    }
    return true;
  }),

  body("email")
    .optional()
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email must be a valid email")
    .notEmpty()
    .withMessage("Email must not be empty"),

  body("phone.countryCode")
    .optional()
    .if(body("phone.number").exists())
    .isString()
    .withMessage("Country code must be a string")
    .trim()
    .notEmpty()
    .withMessage("Country code is required when phone number is provided"),

  body("phone.number")
    .optional()
    .if(body("phone.countryCode").exists())
    .isString()
    .withMessage("Phone number must be a string")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required when country code is provided"),
];

export const verifyUpdateOtp = [
  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.phone) {
      throw new Error("Either email or phone details must be provided");
    }
    return true;
  }),
  body("email")
    .optional()
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email must be a valid email")
    .notEmpty()
    .withMessage("Email must not be empty"),

  body("phone.countryCode")
    .optional()
    .if(body("phone.number").exists())
    .isString()
    .withMessage("Country code must be a string")
    .trim()
    .notEmpty()
    .withMessage("Country code is required when phone number is provided"),

  body("phone.number")
    .optional()
    .if(body("phone.countryCode").exists())
    .isString()
    .withMessage("Phone number must be a string")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required when country code is provided"),

  body("otp")
    .isNumeric()
    .withMessage("otp must be a numeric string")
    .notEmpty()
    .withMessage("otp must not be empty"),
];
export const updateEmail = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email must be a valid email")
    .notEmpty()
    .withMessage("Email must not be empty"),

  body("otp")
    .isNumeric()
    .withMessage("otp must be a numeric string")
    .notEmpty()
    .withMessage("otp must not be empty"),
];

export const updatePhone = [
  body("phone.countryCode")
    .isString()
    .withMessage("Country code must be a string")
    .trim()
    .notEmpty()
    .withMessage("Country code is required"),

  body("phone.number")
    .isString()
    .withMessage("Phone number must be a string")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("otp")
    .isNumeric()
    .withMessage("otp must be a numeric string")
    .notEmpty()
    .withMessage("otp must not be empty"),
];
