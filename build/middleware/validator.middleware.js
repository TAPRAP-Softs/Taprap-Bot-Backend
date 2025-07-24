"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((error) => {
                //@ts-ignore
                return { message: error.msg, path: error.path };
            }),
        });
    }
    next();
};
exports.default = validator;
//# sourceMappingURL=validator.middleware.js.map