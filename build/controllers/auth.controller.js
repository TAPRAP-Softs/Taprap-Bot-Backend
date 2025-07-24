"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const refresh_token_service_1 = __importDefault(require("../services/refresh-token.service"));
const response_model_1 = require("../utils/response.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = require("http-status-codes");
class AuthController {
    async signup(req, res) {
        const userData = req.body;
        try {
            const existingEmail = await user_service_1.default.findOne({
                where: { email: userData.email },
            });
            if (existingEmail) {
                return response_model_1.ResponseModel.error(res, "User with this email already exists", http_status_codes_1.StatusCodes.CONFLICT);
            }
            const existingPhone = await user_service_1.default.findOne({
                where: { phone: userData.phone },
            });
            if (existingPhone) {
                return response_model_1.ResponseModel.error(res, "User with this phone number already exists", http_status_codes_1.StatusCodes.CONFLICT);
            }
            const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
            userData.password = hashedPassword;
            const user = await user_service_1.default.create(userData);
            const refreshToken = await refresh_token_service_1.default.findAndCreateOrUpdate(user.id);
            if (!refreshToken) {
                return response_model_1.ResponseModel.error(res, "Failed to create refresh token");
            }
            return response_model_1.ResponseModel.success(res, "User created successfully", {
                user: user.getPublicData(),
                accessToken: user.generateAccessToken(),
                refreshToken: refreshToken.token,
            }, undefined, http_status_codes_1.StatusCodes.CREATED);
        }
        catch (error) {
            console.error("Error creating user:", error);
            return response_model_1.ResponseModel.error(res, "Failed to create user");
        }
    }
    async login(req, res) {
        try {
            let user;
            const { email, phone, password } = req.body;
            if (phone) {
                user = await user_service_1.default.findOne({
                    where: { phone },
                });
                if (!user) {
                    return response_model_1.ResponseModel.error(res, "User with this phone number does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
                }
            }
            else {
                user = await user_service_1.default.findOne({
                    where: { email },
                });
                if (!user) {
                    return response_model_1.ResponseModel.error(res, "User with this email does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
                }
            }
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return response_model_1.ResponseModel.error(res, "Invalid credentials", http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            const refreshToken = await refresh_token_service_1.default.findAndCreateOrUpdate(user.id);
            if (!refreshToken) {
                return response_model_1.ResponseModel.error(res, "Failed to create refresh token");
            }
            return response_model_1.ResponseModel.success(res, "Login successful", {
                user: user.getPublicData(),
                accessToken: user.generateAccessToken(),
                refreshToken: refreshToken.token,
            }, undefined, http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            console.error("Error during login:", error);
            return response_model_1.ResponseModel.error(res, "Login failed");
        }
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map