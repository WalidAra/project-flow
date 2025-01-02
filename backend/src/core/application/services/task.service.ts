import taskRepo from "@/core/infrastructure/repositories/task.repo";
import { Flag } from "@prisma/client";
import { ValidateError } from "../errors";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const TaskService = {
  createTask: async ({
    projectId,
    prevTag,
    task,
    duration,
    flag,
    dependencies,
  }: {
    projectId: string;
    prevTag: string | undefined;
    task: string;
    duration: number;
    flag: Flag;
    dependencies: string[];
  }) => {

    if (!prevTag) {
      const row = await taskRepo.create({
        duration:Number(duration),
        flag,
        projectId,
        tag: "a",
        task,
        dependencies: [],
      });

      return row;
    } else {
      const index = alphabet.indexOf(prevTag);
      const tag = alphabet[index + 1];
      const row = await taskRepo.create({
        duration: Number(duration),
        flag,
        projectId,
        tag,
        task,
        dependencies,
      });
      return row;
    }
  },

  updateTask: async ({
    taskId,
    task,
    duration,
    flag,
  }: {
    projectId: string;
    taskId: string;
    task: string;
    duration: number;
    flag: Flag;
    dependencies: string[];
  }) => {
    const row = await taskRepo.update(taskId, {
      duration,
      flag,
      task,
    });

    return row;
  },

  deleteTask: async (taskId: string) => {
    if (!taskId) {
      throw new ValidateError("Task ID is required");
    }

    const row = await taskRepo.delete(taskId);

    return row;
  },

  // getTask: async (id: string) => {
  //   if (!id) {
  //     throw new ValidateError("Task ID is required");
  //   }

  //   const row = await taskRepo.findById(id);

  //   if (!row) {
  //     throw new ValidateError("Task not found", 404);
  //   }

  //   return row;
  // },
  // getTasks: async (projectId: string) => {
  //   const rows = await taskRepo.getProjectTasks(projectId);
  //   return rows;
  // },
};

export default TaskService;
