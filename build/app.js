"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("./config/db.config");
const express_1 = __importDefault(require("express"));
const variables_config_1 = require("./config/variables.config");
const index_middleware_1 = __importDefault(require("./middleware/index.middleware"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
(0, index_middleware_1.default)(app);
app.use(error_middleware_1.errorHandler);
const start = async () => {
    try {
        app.listen(variables_config_1.PORT, () => {
            console.log(`Server is running on port ${variables_config_1.PORT}`);
        });
        await db_config_1.database.initialize();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=app.js.map