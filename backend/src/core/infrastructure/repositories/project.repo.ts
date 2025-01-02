import { prisma } from "@/config";
import { Project } from "@/core/domain/entities/";
import { Project as ProjectType } from "@prisma/client";

const ProjectRepository = {
  create: async (
    userId: string,
    data: Omit<ProjectType, "id" | "createdAt" | "updatedAt">
  ) => {
    const obj = await prisma.project.create({ data });

    return new Project(obj);
  },

  findAllByUser: async (userId: string) => {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
    });

    return projects.map((project) => new Project(project));
  },

  findById: async (projectId: string) => {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        tasks: {
          select: {
            dependencies: {
              select: {
                id: true,
                tag: true,
              },
            },
            duration: true,
            flag: true,
            id: true,
            tag: true,
            task: true,
          },
        },
      },
    });

    return project ? new Project(project) : null;
  },

  update: async (projectId: string, data: object) => {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...data,
      },
    });
    return new Project(project);
  },

  delete: async (projectId: string) => {
    const project = await prisma.project.delete({ where: { id: projectId } });
    return new Project(project);
  },
};

export default ProjectRepository;
