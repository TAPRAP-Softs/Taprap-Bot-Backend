"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpRepository = exports.refreshTokenRepository = exports.userRepository = exports.database = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const variables_config_1 = require("./variables.config");
const refresh_token_entity_1 = require("../entities/refresh-token.entity");
const otp_entity_1 = require("../entities/otp.entity");
exports.database = new typeorm_1.DataSource({
    type: "postgres",
    url: variables_config_1.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User, refresh_token_entity_1.RefreshToken, otp_entity_1.Otp],
    migrations: [],
    subscribers: [],
});
exports.userRepository = exports.database.getRepository(user_entity_1.User);
exports.refreshTokenRepository = exports.database.getRepository(refresh_token_entity_1.RefreshToken);
exports.otpRepository = exports.database.getRepository(otp_entity_1.Otp);
//# sourceMappingURL=db.config.js.map