import { Task } from "../model/Task";

export const TaskService = {
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
    const data: Task[] = await response.json();
    return data;
  },
};
