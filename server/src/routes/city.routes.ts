import express from "express";
import { auth, upload } from "../middlewares";
import {
  addCity,
  deleteCity,
  getAllCity,
  getCity,
  updateCity,
} from "../controllers";

const router = express.Router();

router.post("/city", upload.single("image"), addCity);
router.get("/cities", getAllCity);
router.get("/city/:id", getCity);
router.put("/city/:id", updateCity);
router.delete("/city/:id", deleteCity);

export { router as cityRoutes };
