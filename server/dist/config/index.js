"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SECRET = exports.REFRESH_TOKEN_EXIRES = exports.ACCESS_TOKEN_EXIRES = exports.ACCESS_TOKEN_SECRET = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 8000;
exports.MONGO_URI = process.env.MONGO_URI;
// export const NODE_ENV = process.env.NODE_ENV as string;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.ACCESS_TOKEN_EXIRES = process.env.ACCESS_TOKEN_EXIRES;
exports.REFRESH_TOKEN_EXIRES = process.env.REFRESH_TOKEN_EXIRES;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
//# sourceMappingURL=index.js.map