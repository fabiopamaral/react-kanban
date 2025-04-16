import { z } from "zod";

export const CreateTaskRequestSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  status: z.enum(["todo", "doing", "done"]).optional().default("todo"),
  priority: z.enum(["low", "medium", "high"]).optional().default("low"),
});

export const UpdateTaskRequestSchema = z.object({
  status: z.enum(["todo", "doing", "done"]).optional(),
});
