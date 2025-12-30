/*
  Warnings:

  - You are about to drop the column `answerText` on the `UserAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `UserAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `UserAnswer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attemptId]` on the table `UserAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."UserAnswer" DROP CONSTRAINT "UserAnswer_optionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAnswer" DROP CONSTRAINT "UserAnswer_questionId_fkey";

-- AlterTable
ALTER TABLE "public"."UserAnswer" DROP COLUMN "answerText",
DROP COLUMN "optionId",
DROP COLUMN "questionId",
ADD COLUMN     "answers" JSONB[];

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_attemptId_key" ON "public"."UserAnswer"("attemptId");
