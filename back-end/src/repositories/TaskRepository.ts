import { Task } from "../generated/prisma";

export type TaskStatus = "todo" | "doing" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type CreateTaskAttributes = {
  title: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
};

export interface TaskRepository {
  find: () => Promise<Task[]>;
  create: (params: CreateTaskAttributes) => Promise<Task>;
  update: (
    id: number,
    attributes: Partial<CreateTaskAttributes>
  ) => Promise<Task | null>;
  delete: (id: number) => Promise<void>;
}
