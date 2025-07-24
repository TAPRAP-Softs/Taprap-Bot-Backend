"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const error_config_1 = require("../config/error.config");
class CloudinaryService {
    async uploadImages(images) {
        try {
            const uploadPromises = images.map((image) => cloudinary_config_1.default.uploader.upload(image, {
                resource_type: "image",
                folder: "Taprap_Bot/customer/images",
            }));
            const responses = await Promise.all(uploadPromises);
            return responses;
        }
        catch (error) {
            console.log(error);
            throw new error_config_1.CustomError(error.message, error.status || 500);
        }
    }
    async uploadVideos(videos) {
        try {
            const uploadPromises = videos.map((video) => cloudinary_config_1.default.uploader.upload(video, {
                resource_type: "video",
                folder: "Taprap_Bot/customer/videos",
            }));
            const responses = await Promise.all(uploadPromises);
            return responses;
        }
        catch (error) {
            console.log(error);
            throw new error_config_1.CustomError(error.message, error.status || 500);
        }
    }
    async uploadDocuments(documents) {
        try {
            const uploadPromises = documents.map((document) => cloudinary_config_1.default.uploader.upload(document, {
                resource_type: "raw",
                folder: "Taprap_Bot/customer/documents",
            }));
            const responses = await Promise.all(uploadPromises);
            return responses;
        }
        catch (error) {
            console.log(error);
            throw new error_config_1.CustomError(error.message, error.status || 500);
        }
    }
}
exports.default = new CloudinaryService();
//# sourceMappingURL=cloudinary.service.js.map