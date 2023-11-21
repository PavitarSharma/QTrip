"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adventureRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.adventureRoutes = router;
router.post("/", controllers_1.addCityAdventure);
router.get("/", controllers_1.getAdventuresWithCity);
router.get("/details/:id", controllers_1.getAdventureWithId);
router.patch("/:id/favorite", middlewares_1.auth, controllers_1.favoriteAdventure);
router.patch("/:id/review", middlewares_1.auth, controllers_1.ratingAdventure);
// router.put("/:id");
// router.delete("/:id");
router.patch("/reserved", middlewares_1.auth, controllers_1.reserveAdventure);
//# sourceMappingURL=adventure.routes.js.map