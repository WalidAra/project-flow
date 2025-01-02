import { Entity } from "@/core/application/base";
import { ProjectStatus, Team } from "@/core/application/dto/project.dto";
import { Flag, Project as ProjectProps } from "@prisma/client";


interface ProjectData {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  team: Team;
  status: ProjectStatus;
  tasks: {
    task: string;
    id: string;
    tag: string;
    flag: Flag;
    duration: number;
    dependencies: {
      id: string;
      tag: string;
    }[];
  }[];
}

class Project implements Entity {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  team: Team;
  status: ProjectStatus;
  ownerId: string;
  tasks: {
    task: string;
    id: string;
    tag: string;
    flag: Flag;
    duration: number;
    dependencies: {
      id: string;
      tag: string;
    }[];
  }[];

  constructor(
    project: ProjectProps & {
      tasks?: {
        task: string;
        id: string;
        tag: string;
        flag: Flag;
        duration: number;
        dependencies: {
          id: string;
          tag: string;
        }[];
      }[];
    }
  ) {
    this.id = project.id;
    this.title = project.title;
    this.description = project.description;
    this.createdAt = project.createdAt;
    this.updatedAt = project.updatedAt;
    this.team = project.team;
    this.status = project.status;
    this.ownerId = project.ownerId;
    this.tasks = project.tasks || [];
  }

  getData: () => ProjectData = () => ({
    id: this.id,
    title: this.title,
    description: this.description,
    createdAt: this.createdAt,
    team: this.team,
    status: this.status,
    tasks: this.tasks,
  });
}

export default Project;
