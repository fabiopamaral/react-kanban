import { Badge, Flex, Grid, ScrollArea } from "@radix-ui/themes";
import { Task } from "../model/Task";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { TaskService } from "../services/api";

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    TaskService.fetchTasks().then((storedTasks) => setTasks(storedTasks));
  }, []);

  const tasksTodo: Task[] =
    tasks.filter((task) => task.status === "todo") ?? [];
  const tasksInProgress: Task[] =
    tasks.filter((task) => task.status === "doing") ?? [];
  const tasksDone: Task[] =
    tasks.filter((task) => task.status === "done") ?? [];

  return (
    <ScrollArea>
      <Grid columns={"3"} gap={"4"} minWidth={"64rem"}>
        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="gray">
            Para Fazer ({tasksTodo.length})
          </Badge>

          {tasksTodo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="yellow">
            Em Progresso ({tasksInProgress.length})
          </Badge>

          {tasksInProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="green">
            Concluída ({tasksDone.length})
          </Badge>

          {tasksDone.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
      </Grid>
    </ScrollArea>
  );
}

export default TaskBoard;
