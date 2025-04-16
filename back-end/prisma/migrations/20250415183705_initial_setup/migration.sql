-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('todo', 'done', 'doing');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'todo',
    "priority" "TaskPriority" NOT NULL DEFAULT 'low',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
