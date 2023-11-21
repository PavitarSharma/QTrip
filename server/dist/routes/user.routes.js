"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.userRoutes = router;
router.use(middlewares_1.auth);
router.get("/profile", controllers_1.userProfile);
router.put("/profile", controllers_1.updateProfile);
router.patch("/profile/image", middlewares_1.upload.single("image"), controllers_1.uploadUserImage);
router.post("/update-password", controllers_1.updateUserPassword);
//# sourceMappingURL=user.routes.js.map