import express from "express";
import publicRouter from "@/api/public";
import privateRouter from "@/api/private";

import { checkHealth } from "@/scripts";
import { checkAuth } from "@/middlewares";

const router = express.Router();

router.get("/secure/health", checkHealth);
router.use("/public", publicRouter);
router.use("/private", checkAuth, privateRouter);

export default router;
