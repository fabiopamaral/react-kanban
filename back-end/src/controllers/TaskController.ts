import { Handler } from "express";
import {
  CreateTaskRequestSchema,
  UpdateTaskRequestSchema,
} from "./schemas/TaskRequestSchema";
import { TasksService } from "../services/TasksService";

export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  index: Handler = async (req, res, next) => {
    try {
      const tasks = await this.tasksService.fetchTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateTaskRequestSchema.parse(req.body);
      const newTask = await this.tasksService.createTask(body);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = UpdateTaskRequestSchema.parse(req.body);

      const updatedTask = await this.tasksService.updateTask(id, body);
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;

      await this.tasksService.deleteTask(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
