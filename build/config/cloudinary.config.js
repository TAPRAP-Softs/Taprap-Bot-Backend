"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const variables_config_1 = require("../config/variables.config");
const cloudinary = cloudinary_1.v2;
cloudinary.config({
    cloud_name: variables_config_1.CLOUD_NAME,
    api_key: variables_config_1.API_KEY,
    api_secret: variables_config_1.API_SECRET,
});
exports.default = cloudinary;
//# sourceMappingURL=cloudinary.config.js.map