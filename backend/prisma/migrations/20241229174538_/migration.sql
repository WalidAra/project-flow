/*
  Warnings:

  - You are about to drop the column `ef` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `es` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `freeSlack` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `lf` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `ls` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `totalSlack` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "ef",
DROP COLUMN "es",
DROP COLUMN "freeSlack",
DROP COLUMN "lf",
DROP COLUMN "ls",
DROP COLUMN "totalSlack";
