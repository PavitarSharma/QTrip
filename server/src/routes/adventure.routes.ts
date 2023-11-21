import express from "express";
import {
  addCityAdventure,
  favoriteAdventure,
  getAdventureWithId,
  getAdventuresWithCity,
  ratingAdventure,
  reserveAdventure,
} from "../controllers";
import { auth } from "../middlewares";

const router = express.Router();

router.post("/", addCityAdventure);

router.get("/", getAdventuresWithCity);

router.get("/details/:id", getAdventureWithId);

router.patch("/:id/favorite", auth, favoriteAdventure);

router.patch("/:id/review", auth, ratingAdventure);

// router.put("/:id");

// router.delete("/:id");

router.patch("/reserved", auth, reserveAdventure);


export { router as adventureRoutes };
