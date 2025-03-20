export type TaskStatus = "todo" | "doing" | "done";

export type TaskPriority = "high" | "medium" | "low";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}
