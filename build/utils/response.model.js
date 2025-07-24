"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
const http_status_codes_1 = require("http-status-codes");
class ResponseModel {
    constructor(status, statusCode, message, data, meta) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
    static success(res, // 👈 Add res parameter
    message, data, meta, statusCode = http_status_codes_1.StatusCodes.OK) {
        const response = new ResponseModel(true, statusCode, message, data, meta);
        res.status(statusCode).json(response);
    }
    static error(res, // 👈 Add res parameter
    message, statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, data) {
        const response = new ResponseModel(false, statusCode, message, data);
        res.status(statusCode).json(response);
    }
}
exports.ResponseModel = ResponseModel;
//# sourceMappingURL=response.model.js.map