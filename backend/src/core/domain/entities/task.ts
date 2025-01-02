import { Entity } from "@/core/application/base";
import { Flag, Project, Task as TaskType } from "@prisma/client";

class Task implements Entity {
  id: string;
  tag: string;
  task: string;
  flag: Flag;
  duration: number;
  projectId: string;
  dependencies: TaskType[];

  constructor(data: TaskType & { dependencies: TaskType[] }) {
    this.id = data.id;
    this.tag = data.tag;
    this.task = data.task;
    this.flag = data.flag;
    this.duration = data.duration;
    this.projectId = data.projectId;
    this.dependencies = data.dependencies;
  }

  getData: () => object = () => ({
    id: this.id,
    tag: this.tag,
    task: this.task,
    flag: this.flag,
    duration: this.duration,
    dependencies: this.dependencies,
  });
}

export default Task;
