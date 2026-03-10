/*
  Warnings:

  - A unique constraint covering the columns `[attemptId,queId,optionId]` on the table `UserAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."UserAnswer_optionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_attemptId_queId_optionId_key" ON "public"."UserAnswer"("attemptId", "queId", "optionId");
