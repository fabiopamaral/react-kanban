import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../model/Task";
import { TaskService } from "../services/api";

export interface TasksContextData {
  tasks: Task[];
  createTask: (attributes: Omit<Task, "id">) => Promise<void>;
  updateTask: (
    taskId: number,
    attributes: Partial<Omit<Task, "id">>
  ) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

export const TasksContext = createContext({} as TasksContextData);

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    TaskService.fetchTasks().then((storedTasks) => setTasks(storedTasks));
  }, []);

  const createTask = async (attributes: Omit<Task, "id">) => {
    setTasks((currentState) => {
      const updatedTasks = [...currentState, { id: 823, ...attributes }];
      return updatedTasks;
    });
  };

  const updateTask = async (
    id: number,
    attributes: Partial<Omit<Task, "id">>
  ) => {};

  const deleteTask = async (id: number) => {};

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
