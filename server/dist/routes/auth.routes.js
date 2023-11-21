"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.authRoutes = router;
router.post("/register", controllers_1.signUp);
router.post("/login", controllers_1.login);
router.post("/logout", controllers_1.logout);
//# sourceMappingURL=auth.routes.js.map