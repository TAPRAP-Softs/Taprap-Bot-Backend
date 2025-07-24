"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../config/db.config");
const generic_service_1 = require("./generic.service");
class UserService extends generic_service_1.GenericService {
    constructor() {
        super(db_config_1.userRepository);
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map