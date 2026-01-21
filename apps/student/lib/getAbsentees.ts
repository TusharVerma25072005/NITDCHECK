"use server";

import prisma from "@repo/database/client";
import { Session } from "next-auth";
import { SubjectAttendanceProps } from "../components/subjectAttendanceCard";
import { ClassRecord } from "../components/subjectAttendanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getAbsenteesData = async () => {
    const session: Session | null = await getServerSession(authOptions);
    if (
        !session?.user?.id || !session?.user?.dept || !session?.user?.semester
    ) {
        return [];
    }
    const startDate = new Date(2025, 8, 5);
    startDate.setHours(12, 0, 0, 0);
    const { semester, dept, id: enrollmentNo } = session.user;
    const teaches = await prisma.teaches.findMany({
        where: {
            dept: dept as any,
            semester: semester,
        },
        include: {
            teacher: { select: { name: true } },
            course: { select: { course_code: true, course_name: true } },
            timetable: { select: { day: true, start: true } },
        },
    });
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const nonWorking = await prisma.nonworkingdays.findMany({
        where: {
            date: { gte: startDate, lte: today },
        },
        select: { date: true, day: true },
    });

    const nonWorkingDates = new Set(
        nonWorking.map((n) => n.date.toDateString()),
    );
    const result: SubjectAttendanceProps[] = await Promise.all(
        teaches.map(async (teach) => {
            const classDays = teach.timetable.map((t) => t.day);
            const totalClassDates: Date[] = [];
            for (
                let d = new Date(startDate);
                d <= today;
                d.setDate(d.getDate() + 1)
            ) {
                const dayName = d
                    .toLocaleString("en-IN", { weekday: "long" })
                    .toUpperCase() as any;
                    
                
                if (
                    classDays.includes(dayName) &&
                    !nonWorkingDates.has(d.toDateString())
                ) {
                    
                    totalClassDates.push(new Date(d));
                }
            }

            const total = totalClassDates.length;

            const absentees = await prisma.absentees.findMany({
                where: { teaches_id: teach.id, enrollment_no: enrollmentNo },
                select: { date: true },
            });

            const absentDates = new Set(
                absentees.map((a) => a.date.toDateString()),
            );
            const attended = total - absentees.length;

            const recentClasses: ClassRecord[] = totalClassDates
                .slice(-3)
                .reverse()
                .map((date) => {
                    const timetableEntry = teach.timetable.find((t) => {
                        const dayName = date
                            .toLocaleString("en-IN", { weekday: "long" })
                            .toUpperCase();
                        return t.day === dayName;
                    });

                    return {
                        date: date.toLocaleDateString("en-IN"),
                        time: timetableEntry?.start || "09:00 AM",
                        status: absentDates.has(date.toDateString())
                            ? "Absent"
                            : "Present",
                    };
                });
            
            return {
                subjectCode: teach.course.course_code,
                subjectName: teach.course.course_name,
                instructor: teach.teacher.name,
                attended,
                total,
                recentClasses,
            };
        }),
    );
    
    return result;
};
