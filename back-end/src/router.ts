import { Router } from "express";
import { TaskController } from "./controllers/TaskController";
import { PrismaTasksRepository } from "./repositories/prisma/PrismaTasksRepository";
import { TasksService } from "./services/TasksService";

export const router = Router();

const tasksRepository = new PrismaTasksRepository();

const tasksService = new TasksService(tasksRepository);

const taskController = new TaskController(tasksService);

router.get("/tasks", taskController.index);

router.post("/tasks", taskController.create);

router.patch("/tasks/:id", taskController.update);

router.delete("/tasks/:id", taskController.delete);
