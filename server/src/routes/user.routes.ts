import express from "express";
import {
  updateProfile,
  updateUserPassword,
  uploadUserImage,
  userProfile,
} from "../controllers";
import { auth, upload } from "../middlewares";

const router = express.Router();

router.use(auth);
router.get("/profile", userProfile);
router.put("/profile", updateProfile);
router.patch("/profile/image", upload.single("image"), uploadUserImage);
router.post("/update-password", updateUserPassword);

export { router as userRoutes };
