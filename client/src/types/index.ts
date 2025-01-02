/* eslint-disable @typescript-eslint/no-explicit-any */
export type Fetch = {
  accessToken?: string;
  feature: "auth" | "projects" | "user";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
};

export type FetchResponse<T> = {
  data: T;
  message: string;
};

export type AccessToken = {
  accessToken: string;
};

export type Team = "WEB" | "MOBILE" | "DEVOPS" | "DESIGN" | "QA" | "PRODUCT";
export type ProjectStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PLANING"
  | "CANCELED";

export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  team: Team;
  status: ProjectStatus;
  criticalPath: { duration: number; tag: string }[];
};

export type Widget = {
  totalTasks: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  image: string | null;
  provider: "DIRECT" | "GOOGLE";
};

export type Task = {
  id: string;
  tag: string;
  flag: any;
  duration: number;
  task: string;
  dependencies: {
    id: string;
    tag: string;
  }[];
};
