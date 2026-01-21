/*
  Warnings:

  - The primary key for the `Absentees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Absentees" DROP CONSTRAINT "Absentees_pkey",
ADD CONSTRAINT "Absentees_pkey" PRIMARY KEY ("enrollment_no", "teaches_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_id_key" ON "public"."Teacher"("id");
