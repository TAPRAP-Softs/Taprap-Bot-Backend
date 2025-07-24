"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../config/db.config");
const generic_service_1 = require("./generic.service");
const jwt = __importStar(require("jsonwebtoken"));
const variables_config_1 = require("../config/variables.config");
class RefreshTokenService extends generic_service_1.GenericService {
    constructor() {
        super(db_config_1.refreshTokenRepository);
    }
    async findAndCreateOrUpdate(userId) {
        const existingToken = await this.findOne({ where: { userId } });
        if (existingToken) {
            existingToken.token = this.generateRefreshToken({ doNot: "decode" });
            return await this.update(existingToken.id, existingToken);
        }
        const newToken = await this.create({
            userId,
            token: this.generateRefreshToken({ doNot: "decode" }),
        });
        return newToken;
    }
    generateRefreshToken(payload) {
        const options = {
            //@ts-ignore
            expiresIn: variables_config_1.REFRESH_TOKEN_EXPIRY_TIME,
        };
        return jwt.sign(payload, variables_config_1.REFRESH_TOKEN_SECRET, options);
    }
}
exports.default = new RefreshTokenService();
//# sourceMappingURL=refresh-token.service.js.map