import { prisma } from "../../database/db";
import { Task } from "../../generated/prisma";
import { CreateTaskAttributes, TaskRepository } from "../TaskRepository";

export class PrismaTasksRepository implements TaskRepository {
  async find(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async create(params: CreateTaskAttributes): Promise<Task> {
    return prisma.task.create({ data: params });
  }

  async update(
    id: number,
    attributes: Partial<CreateTaskAttributes>
  ): Promise<Task | null> {
    return prisma.task.update({ where: { id }, data: attributes });
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
