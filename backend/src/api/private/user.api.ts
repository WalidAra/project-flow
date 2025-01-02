import express from "express";
import { AuthController, UserController } from "@/core/interfaces/controllers";

const router = express.Router();
const { signOut } = AuthController;
const { getProfile } = UserController;

router.get("/signout", signOut);
router.get("/me", getProfile);

export default router;
