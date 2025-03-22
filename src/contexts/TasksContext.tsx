import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../model/Task";
import { TaskService } from "../services/api";

export interface TasksContextData {
  tasks: Task[];
  createTask: (attributes: Omit<Task, "id">) => Promise<void>;
  updateTask: (
    taskId: string,
    attributes: Partial<Omit<Task, "id">>
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
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
    const newTask = await TaskService.createTask(attributes);
    setTasks((currentState) => [...currentState, newTask]);
  };

  const updateTask = async (
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ) => {
    await TaskService.updateTask(id, attributes);
    setTasks((currentState) => {
      const updatedTasks = [...currentState];
      const taskIndex = updatedTasks.findIndex((task) => task.id === id);
      Object.assign(updatedTasks[taskIndex], attributes);
      return updatedTasks;
    });
  };

  const deleteTask = async (id: string) => {
    await TaskService.deleteTask(id);
    setTasks((currentState) => currentState.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
