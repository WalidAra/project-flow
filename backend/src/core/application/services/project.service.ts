import { projectRepo } from "@/core/infrastructure/repositories";
import { ValidateError } from "../errors";
import { Project } from "@prisma/client";

type Task = {
  task: string;
  id: string;
  tag: string;
  flag: string;
  duration: number;
  dependencies: {
    id: string;
    tag: string;
  }[];
};

function calculateSlacks(tasks: Task[]): Task[] {
  // Helper function to find a task by ID
  const findTaskById = (id: string) => tasks.find((task) => task.id === id);

  // Calculate early and late start/finish times
  const earlyStart: Record<string, number> = {};
  const lateFinish: Record<string, number> = {};

  // Step 1: Calculate early start (ES) and early finish (EF)
  tasks.forEach((task) => {
    const dependencyMax = Math.max(
      0,
      ...task.dependencies.map(
        (dep) =>
          (earlyStart[dep.id] || 0) + (findTaskById(dep.id)?.duration || 0)
      )
    );
    earlyStart[task.id] = dependencyMax;
  });

  const projectDuration = Math.max(
    ...tasks.map((task) => earlyStart[task.id] + task.duration)
  );

  // Step 2: Calculate late start (LS) and late finish (LF)
  tasks.reverse().forEach((task) => {
    const dependentsMin = Math.min(
      projectDuration,
      ...tasks
        .filter((t) => t.dependencies.some((dep) => dep.id === task.id))
        .map((t) => lateFinish[t.id] || projectDuration)
    );
    lateFinish[task.id] = dependentsMin - task.duration;
  });
  tasks.reverse();

  // Step 3: Calculate slack times
  return tasks.map((task) => {
    const freeSlack = Math.min(
      ...tasks
        .filter((t) => t.dependencies.some((dep) => dep.id === task.id))
        .map(
          (t) =>
            (earlyStart[t.id] || projectDuration) -
            (earlyStart[task.id] + task.duration)
        )
    );
    const totalSlack =
      (lateFinish[task.id] || projectDuration) -
      (earlyStart[task.id] + task.duration);

    return {
      ...task,
      freeSlack: freeSlack === Infinity ? 0 : freeSlack, // Default to 0 if no dependents
      totalSlack,
    };
  });
}

function findCriticalPath(tasks: Task[]): { tag: string; duration: number }[] {
  const taskMap = new Map<string, Task>();
  const earlyStart = new Map<string, number>();
  const earlyFinish = new Map<string, number>();
  const lateStart = new Map<string, number>();
  const lateFinish = new Map<string, number>();

  // Map tasks by ID for quick lookup
  tasks.forEach((task) => taskMap.set(task.id, task));

  // Topological sorting to process tasks in dependency order
  const sortedTasks = topologicalSort(tasks);

  // Step 1: Calculate early start and finish times
  for (const task of sortedTasks) {
    const dependencies = task.dependencies.map((dep) => dep.id);
    const maxFinish = dependencies.reduce(
      (max, depId) => Math.max(max, earlyFinish.get(depId) || 0),
      0
    );

    const start = maxFinish;
    const finish = start + task.duration;

    earlyStart.set(task.id, start);
    earlyFinish.set(task.id, finish);
  }

  // Step 2: Calculate late start and finish times (reverse order)
  const maxProjectDuration = Math.max(...Array.from(earlyFinish.values()));

  for (let i = sortedTasks.length - 1; i >= 0; i--) {
    const task = sortedTasks[i];
    const dependents = tasks.filter((t) =>
      t.dependencies.some((dep) => dep.id === task.id)
    );

    const minStart = dependents.reduce(
      (min, dependent) =>
        Math.min(min, lateStart.get(dependent.id) || maxProjectDuration),
      maxProjectDuration
    );

    const finish = minStart;
    const start = finish - task.duration;

    lateStart.set(task.id, start);
    lateFinish.set(task.id, finish);
  }

  // Step 3: Identify critical path
  const criticalPath = sortedTasks
    .filter(
      (task) =>
        earlyStart.get(task.id) === lateStart.get(task.id) &&
        earlyFinish.get(task.id) === lateFinish.get(task.id)
    )
    .map((task) => ({ tag: task.tag, duration: task.duration }));

  return criticalPath;
}

function topologicalSort(tasks: Task[]): Task[] {
  const indegree = new Map<string, number>();
  const graph = new Map<string, Task[]>();

  tasks.forEach((task) => {
    indegree.set(task.id, 0);
    graph.set(task.id, []);
  });

  tasks.forEach((task) => {
    task.dependencies.forEach((dep) => {
      const dependencyId = dep.id;
      graph.get(dependencyId)?.push(task);
      indegree.set(task.id, (indegree.get(task.id) || 0) + 1);
    });
  });

  const queue: Task[] = tasks.filter((task) => indegree.get(task.id) === 0);
  const result: Task[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    graph.get(current.id)?.forEach((neighbor) => {
      indegree.set(neighbor.id, (indegree.get(neighbor.id) || 0) - 1);
      if (indegree.get(neighbor.id) === 0) {
        queue.push(neighbor);
      }
    });
  }

  if (result.length !== tasks.length) {
    throw new Error("Cycle detected in the task dependency graph");
  }

  return result;
}

const ProjectService = {
  getUserProjects: async (userId: string) => {
    if (!userId) {
      throw new ValidateError("User id is required", 400);
    }

    const projects = await projectRepo.findAllByUser(userId);

    return projects.map((project) => {
      return project.getData();
    });
  },

  getProjectById: async (projectId: string) => {
    if (!projectId) {
      throw new ValidateError("Project id is required", 400);
    }

    const project = await projectRepo.findById(projectId);

    if (!project) {
      throw new ValidateError("Project not found", 404);
    }

    const proj = project.getData();

    const finalObj = {
      criticalPath: findCriticalPath(proj.tasks),
      widgets: {
        totalTasks: proj.tasks.length,
      },
      ...proj,
      tasks: calculateSlacks(proj.tasks),
    };

    return finalObj;
  },

  createProject: async (
    userId: string,
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "ownerId">
  ) => {
    if (!userId) {
      throw new ValidateError("User id is required", 400);
    }

    if (!projectData) {
      throw new ValidateError("Project data is required", 400);
    }

    const project = await projectRepo.create(userId, {
      ...projectData,
      ownerId: userId,
    });

    return project.getData();
  },

  updateProject: async (projectId: string, projectData: Partial<Project>) => {
    if (!projectId) {
      throw new ValidateError("Project id is required", 400);
    }

    if (!projectData) {
      throw new ValidateError("Project data is required", 400);
    }

    const project = await projectRepo.update(projectId, projectData);

    if (!project) {
      throw new ValidateError("Project not found", 404);
    }

    return project.getData();
  },

  deleteProject: async (projectId: string) => {
    if (!projectId) {
      throw new ValidateError("Project id is required", 400);
    }

    (await projectRepo.delete(projectId)).getData();
  },
};

export default ProjectService;
