import express from "express";
import userRouter from "./user.api";
import projectRouter from "./projects/project.api";

const router = express.Router();

router.use("/user", userRouter);
router.use("/projects", projectRouter);

export default router;
