"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 400).send({
        success: false,
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map