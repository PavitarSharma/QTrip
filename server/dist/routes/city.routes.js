"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.cityRoutes = router;
router.post("/city", middlewares_1.upload.single("image"), controllers_1.addCity);
router.get("/cities", controllers_1.getAllCity);
router.get("/city/:id", controllers_1.getCity);
router.put("/city/:id", controllers_1.updateCity);
router.delete("/city/:id", controllers_1.deleteCity);
//# sourceMappingURL=city.routes.js.map