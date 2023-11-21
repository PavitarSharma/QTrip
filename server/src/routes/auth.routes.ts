import express from "express";
import { login, logout, signUp } from "../controllers";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.post("/logout", logout);

export { router as authRoutes };
