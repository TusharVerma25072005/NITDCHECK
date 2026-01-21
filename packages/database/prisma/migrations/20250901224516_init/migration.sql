-- CreateEnum
CREATE TYPE "public"."Department" AS ENUM ('CSE', 'ECE', 'ME', 'CE', 'EE');

-- CreateEnum
CREATE TYPE "public"."Course" AS ENUM ('BTech', 'MTech', 'PhD');

-- CreateEnum
CREATE TYPE "public"."Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "public"."Student" (
    "enrollment_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dept" "public"."Department" NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "course" "public"."Course" NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("enrollment_no")
);

-- CreateTable
CREATE TABLE "public"."Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dept" "public"."Department" NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Courses" (
    "course_code" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("course_code")
);

-- CreateTable
CREATE TABLE "public"."Teaches" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "Teaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Timetable" (
    "teaches_id" TEXT NOT NULL,
    "day" "public"."Days" NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("teaches_id","day","start")
);

-- CreateTable
CREATE TABLE "public"."Nonworkingdays" (
    "date" TIMESTAMP(3) NOT NULL,
    "day" "public"."Days" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Nonworkingdays_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "public"."Absentees" (
    "enrollment_no" TEXT NOT NULL,
    "teaches_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absentees_pkey" PRIMARY KEY ("enrollment_no","teaches_id")
);

-- CreateIndex
CREATE INDEX "Student_enrollment_no_idx" ON "public"."Student"("enrollment_no");

-- CreateIndex
CREATE INDEX "Teacher_id_idx" ON "public"."Teacher"("id");

-- CreateIndex
CREATE INDEX "Courses_course_code_idx" ON "public"."Courses"("course_code");

-- CreateIndex
CREATE INDEX "Teaches_teacher_id_idx" ON "public"."Teaches"("teacher_id");

-- CreateIndex
CREATE INDEX "Teaches_course_code_idx" ON "public"."Teaches"("course_code");

-- CreateIndex
CREATE INDEX "Absentees_enrollment_no_idx" ON "public"."Absentees"("enrollment_no");

-- AddForeignKey
ALTER TABLE "public"."Teaches" ADD CONSTRAINT "Teaches_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Teaches" ADD CONSTRAINT "Teaches_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "public"."Courses"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Timetable" ADD CONSTRAINT "Timetable_teaches_id_fkey" FOREIGN KEY ("teaches_id") REFERENCES "public"."Teaches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Absentees" ADD CONSTRAINT "Absentees_enrollment_no_fkey" FOREIGN KEY ("enrollment_no") REFERENCES "public"."Student"("enrollment_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Absentees" ADD CONSTRAINT "Absentees_teaches_id_fkey" FOREIGN KEY ("teaches_id") REFERENCES "public"."Teaches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
