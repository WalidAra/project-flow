import express from "express";
import { AuthController } from "@/core/interfaces/controllers";
import { googleAuthScope, googleAuthSession } from "@/middlewares";

const router = express.Router();
const { signIn, signUp, googleAuth, refreshToken } = AuthController;

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/refresh", refreshToken);

router.get("/google", googleAuthScope);
router.get("/google/callback", googleAuthSession, googleAuth);

export default router;
