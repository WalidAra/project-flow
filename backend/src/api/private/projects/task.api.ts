import TaskController from "@/core/interfaces/controllers/task.controller";
import express from "express";

const router = express.Router();

const { createTask, deleteTask, updateTask } = TaskController;

router
  .post("/:id/tasks/create", createTask)
  .put("/:id/tasks/:taskId/update", updateTask)
  .delete("/:id/tasks/:taskId/delete", deleteTask);

export default router;
