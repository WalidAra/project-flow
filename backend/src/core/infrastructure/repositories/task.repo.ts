import { prisma } from "@/config";
import TaskEntity from "@/core/domain/entities/task";
import { Task as TaskType } from "@prisma/client";

const TaskRepository = {
  create: async ({
    dependencies,
    ...data
  }: Omit<TaskType, "id"> & { dependencies: string[] }) => {
    const taskIds = dependencies.map((id) => ({ id }));

    const obj = await prisma.task.create({
      data: { ...data, dependencies: { connect: taskIds } },
      include: { dependencies: true },
    });

    return new TaskEntity(obj);
  },

  findById: async (taskId: string) => {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { dependencies: true },
    });

    return task ? new TaskEntity(task) : null;
  },

  update: async (taskId: string, data: Partial<TaskType>) => {
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
      include: { dependencies: true },
    });

    return new TaskEntity(task);
  },

  delete: async (taskId: string) => {
    const task = await prisma.task.delete({
      where: { id: taskId },
      include: { dependencies: true },
    });

    return new TaskEntity(task);
  },

  getProjectTasks: async (projectId: string) => {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: {
        dependencies: true,
      },
    });

    return tasks.map((task) => new TaskEntity(task));
  },
};

export default TaskRepository;
