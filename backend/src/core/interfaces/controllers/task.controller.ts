import { error500 } from "@/constants";
import { ValidateError } from "@/core/application/errors";
import TaskService from "@/core/application/services/task.service";
import { Request, Response } from "express";

const TaskController = {
  createTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { prevTag, task, duration, dependencies, flag } = req.body;

      const result = await TaskService.createTask({
        projectId: id,
        prevTag,
        task,
        duration,
        dependencies,
        flag,
      });

      res.status(201).json({ message: "Task created", data: result });
    } catch (e: unknown) {
      console.error(e);

      if (e instanceof ValidateError) {
        res.status(e.status).json({ message: e.message, data: null });
      }
      res.status(500).json(error500);
    }
  },
  updateTask: async (req: Request, res: Response) => {
    try {
      const { id: projectId, taskId } = req.params;
      const { task, duration, dependencies, flag } = req.body;

      const result = await TaskService.updateTask({
        projectId,
        taskId,
        task,
        duration,
        dependencies,
        flag,
      });

      res.status(200).json({ message: "Task updated", data: result });
    } catch (e: unknown) {
      if (e instanceof ValidateError) {
        res.status(e.status).json({ message: e.message, data: null });
      }

      res.status(500).json(error500);
    }
  },
  deleteTask: async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;

      const result = await TaskService.deleteTask(taskId);
      res.status(200).json({ message: "Task deleted", data: result });
    } catch (e: unknown) {
      if (e instanceof ValidateError) {
        res.status(e.status).json({ message: e.message, data: null });
      }

      res.status(500).json(error500);
    }
  },
};

export default TaskController;
