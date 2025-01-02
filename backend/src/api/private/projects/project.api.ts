import { ProjectController } from "@/core/interfaces/controllers";
import express from "express";
import taskRouter from "./task.api";

const router = express.Router();
const {
  createProject,
  deleteProject,
  getProjectById,
  getUserProjects,
  updateProject,
} = ProjectController;

router.get("/all", getUserProjects);
router.get("/:id", getProjectById).use("/", taskRouter);
router.post("/create", createProject);
router.put("/:id/update", updateProject);
router.delete("/:id/delete", deleteProject);

export default router;
