-- CreateEnum
CREATE TYPE "Flag" AS ENUM ('FEATURE', 'IMPROVEMENT', 'BUG', 'REFACTOR', 'DOCUMENTATION');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "flag" "Flag" NOT NULL DEFAULT 'FEATURE',
    "duration" INTEGER NOT NULL,
    "freeSlack" INTEGER NOT NULL,
    "totalSlack" INTEGER NOT NULL,
    "es" INTEGER NOT NULL,
    "ef" INTEGER NOT NULL,
    "ls" INTEGER NOT NULL,
    "lf" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskDependency" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskDependency_AB_unique" ON "_TaskDependency"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskDependency_B_index" ON "_TaskDependency"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskDependency" ADD CONSTRAINT "_TaskDependency_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskDependency" ADD CONSTRAINT "_TaskDependency_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
