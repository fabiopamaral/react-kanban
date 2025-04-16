import { HttpError } from "../errors/HttpError";
import { Task } from "../generated/prisma";
import { TaskRepository } from "../repositories/TaskRepository";

export class TasksService {
  constructor(private readonly tasksRepository: TaskRepository) {}

  async fetchTasks() {
    return await this.tasksRepository.find();
  }

  async createTask(params: Omit<Task, "id">) {
    return await this.tasksRepository.create(params);
  }

  async updateTask(id: number, params: Partial<Omit<Task, "id">>) {
    const updatedTask = await this.tasksRepository.update(id, params);

    if (!updatedTask) throw new HttpError(404, "Tarefa não encontrada!");

    return updatedTask;
  }

  async deleteTask(id: number) {
    return await this.tasksRepository.delete(id);
  }
}
