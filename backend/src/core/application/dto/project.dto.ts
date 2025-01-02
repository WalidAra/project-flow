export type Team = "WEB" | "MOBILE" | "DEVOPS" | "DESIGN" | "QA" | "PRODUCT";
export type ProjectStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PLANING"
  | "CANCELED";

export type ProjectDTO = {
  id: string;
  title: string;
  description: string;
  team: Team;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
};

export default ProjectDTO;
