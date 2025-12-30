/*
  Warnings:

  - You are about to drop the column `answers` on the `UserAnswer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[optionId]` on the table `UserAnswer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attemptId,queId]` on the table `UserAnswer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `queId` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."UserAnswer_attemptId_key";

-- AlterTable
ALTER TABLE "public"."UserAnswer" DROP COLUMN "answers",
ADD COLUMN     "answerText" TEXT,
ADD COLUMN     "optionId" TEXT,
ADD COLUMN     "queId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_optionId_key" ON "public"."UserAnswer"("optionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_attemptId_queId_key" ON "public"."UserAnswer"("attemptId", "queId");

-- AddForeignKey
ALTER TABLE "public"."UserAnswer" ADD CONSTRAINT "UserAnswer_queId_fkey" FOREIGN KEY ("queId") REFERENCES "public"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAnswer" ADD CONSTRAINT "UserAnswer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "public"."Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
