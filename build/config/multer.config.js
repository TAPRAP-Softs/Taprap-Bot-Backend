"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeVideos = exports.storeImages = exports.store = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.store = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if ([".jpg", ".png", ".jpeg", ".svg"].indexOf(ext.toLowerCase()) === -1) {
            cb(new Error("File type is not supported"));
            return;
        }
        cb(null, true);
    },
});
exports.storeImages = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if ([".jpg", ".png", ".jpeg", ".svg"].indexOf(ext.toLowerCase()) === -1) {
            cb(new Error("File type is not supported"));
            return;
        }
        cb(null, true);
    },
}).array("images", 5);
exports.storeVideos = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if ([".mp4", ".avi", ".mov", ".mkv"].indexOf(ext.toLowerCase()) === -1) {
            cb(new Error("File type is not supported"));
            return;
        }
        cb(null, true);
    },
});
//# sourceMappingURL=multer.config.js.map