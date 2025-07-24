"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const cloudinary_service_1 = __importDefault(require("../services/cloudinary.service"));
const multer_config_1 = require("../config/multer.config");
const response_model_1 = require("../utils/response.model");
const http_status_codes_1 = require("http-status-codes");
const get_video_duration_1 = require("get-video-duration");
class UserController {
    async upload(req, res) {
        try {
            const fileType = req.params.fileType;
            // Determine the multer configuration and Cloudinary upload function based on fileType
            let multerConfig;
            let uploadFunction;
            switch (fileType) {
                case "image":
                    multerConfig = multer_config_1.storeImages;
                    uploadFunction = cloudinary_service_1.default.uploadImages;
                    break;
                case "video":
                    multerConfig = multer_config_1.storeVideos.array("videos", 1);
                    uploadFunction = cloudinary_service_1.default.uploadVideos;
                    break;
                default:
                    return response_model_1.ResponseModel.error(res, "Invalid file type", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            // Apply the multer configuration
            multerConfig(req, res, async (err) => {
                if (err) {
                    return response_model_1.ResponseModel.error(res, err.message || "File upload error", http_status_codes_1.StatusCodes.BAD_REQUEST);
                }
                // Check if files are uploaded
                if (!req.files ||
                    (Array.isArray(req.files) && req.files.length === 0)) {
                    return response_model_1.ResponseModel.error(res, "No files uploaded", http_status_codes_1.StatusCodes.BAD_REQUEST);
                }
                for (const file of req.files) {
                    const check = file.mimetype.search("video");
                    if (check !== -1) {
                        const duration = await (0, get_video_duration_1.getVideoDurationInSeconds)(file.path);
                        console.log(duration);
                        if (duration && duration > 30) {
                            return res.status(400).send({
                                success: false,
                                message: `Duration of file: "${file.originalname}" is greater than 30 seconds`,
                            });
                        }
                    }
                }
                // Extract file paths from the uploaded files
                const files = req.files.map((file) => file.path);
                // Call the corresponding Cloudinary upload function
                const uploadedFiles = (await uploadFunction(files)).map((file) => {
                    return file.secure_url;
                });
                return res.status(200).send({
                    success: true,
                    message: `${fileType}(s) uploaded successfully`,
                    data: { uploadedFiles },
                });
            });
        }
        catch (error) {
            console.error("Error uploading documents", error);
            return res.status(500).send({
                success: false,
                message: "Internal server error",
            });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid token",
                });
            }
            const user = await user_service_1.default.findById(userId);
            if (!user) {
                return response_model_1.ResponseModel.error(res, "User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            return response_model_1.ResponseModel.success(res, "User profile retrieved successfully", {
                user: user.getPublicData(),
            });
        }
        catch (error) {
            console.error("Error retrieving user profile:", error);
            return response_model_1.ResponseModel.error(res, "Internal server error", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map