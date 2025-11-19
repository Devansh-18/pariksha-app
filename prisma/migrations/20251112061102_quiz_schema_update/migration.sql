/*
  Warnings:

  - The values [PARAGRAPH] on the enum `Question_Type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Attempt` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Question_Type_new" AS ENUM ('SUBJECTIVE', 'MCQ');
ALTER TABLE "public"."Question" ALTER COLUMN "type" TYPE "public"."Question_Type_new" USING ("type"::text::"public"."Question_Type_new");
ALTER TYPE "public"."Question_Type" RENAME TO "Question_Type_old";
ALTER TYPE "public"."Question_Type_new" RENAME TO "Question_Type";
DROP TYPE "public"."Question_Type_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Attempt" DROP CONSTRAINT "Attempt_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Attempt" DROP COLUMN "userId";
