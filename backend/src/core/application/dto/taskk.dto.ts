import { Project } from "@/core/domain/entities";

export interface TaskDTO {
  id: string;
  tag: string;
  task: string;
  flag: Flag;
  duration: number;
  freeSlack: number;
  totalSlack: number;
  es: number;
  ef: number;
  ls: number;
  lf: number;
  projectId: string;
  project: Project;
  dependant?: TaskDTO[];
}

// dto/flag.enum.ts
export enum Flag {
  FEATURE = "FEATURE",
  IMPROVEMENT = "IMPROVEMENT",
  BUG = "BUG",
  REFACTOR = "REFACTOR",
  DOCUMENTATION = "DOCUMENTATION",
}
