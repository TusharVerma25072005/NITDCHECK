"use server";
import prisma from "@repo/database/client";

enum Days {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
}

interface ClassData {
    teachesId: string;
    courseName: string;
    totalStudents: number;
    presentToday: number;
    attendancePercent: number;
    room: string;
    schedule: string;
    attendanceRecords: {
        date: string;
        absent: number;
        present: number;
    }[];
    todaysData: {
        enrollment_no: string;
        name: string;
        status: boolean;
    }[];
    semester: number;
    dept: any;
}

export async function getData(
    { teacherId }: { teacherId: string },
): Promise<ClassData[]> {
    const teaches = await prisma.teaches.findMany({
        where: { teacher_id: teacherId },
        select: {
            id: true,
            semester: true,
            dept: true,
            course: {
                select: {
                    course_code: true,
                    course_name: true,
                },
            },
            timetable: {
                select: {
                    day: true,
                    start: true,
                    end: true,
                    room_no: true,
                },
            },
        },
    });

    const results = await Promise.all(
        teaches.map(async (teach) => {
            const startDate = new Date(2025, 8, 5);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date();
            endDate.setHours(0, 0, 0, 0);

            const classDays = teach.timetable.map((t) => t.day);
            const totalClassDates: Date[] = [];
            for (
                let d = new Date(startDate);
                d <= endDate;
                d.setDate(d.getDate() + 1)
            ) {
                const dayName = d.toLocaleString("en-IN", { weekday: "long" })
                    .toUpperCase() as Days;
                if (classDays.includes(dayName)) {
                    totalClassDates.push(new Date(d));
                }
            }

            const absentees = await prisma.absentees.findMany({
                where: { teaches_id: teach.id },
                select: { date: true, enrollment_no: true },
            });

            const absenteeMap: Record<string, number> = {};
            for (const a of absentees) {
                const key = a.date.toISOString().split("T")[0];
                if (!key) continue;
                absenteeMap[key] = (absenteeMap[key] ?? 0) + 1;
            }

            const students = await prisma.student.findMany({
                where: { dept: teach.dept, semester: teach.semester },
                select: { enrollment_no: true, name: true },
            });
            const totalStudents = students.length;

            const attendanceRecords = totalClassDates.map((d) => {
                const key = d.toISOString().split("T")[0];
                if (!key) return { date: null, absent: 0, present: 0 };
                const absent = absenteeMap[key] ?? 0;
                const present = Math.max(0, totalStudents - absent);
                return {
                    date: key,
                    absent,
                    present,
                };
            });

            const weekday = endDate.toLocaleString("en-IN", { weekday: "long" })
                .toUpperCase() as Days;
            const isClassToday = classDays.includes(weekday);

            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
            const endOfToday = new Date();
            endOfToday.setHours(23, 59, 59, 999);

            const todaysAbsentees = isClassToday
                ? await prisma.absentees.findMany({
                    where: {
                        teaches_id: teach.id,
                        date: {
                            gte: startOfToday,
                            lt: endOfToday,
                        },
                    },
                    select: {
                        student: {
                            select: {
                                enrollment_no: true,
                                name: true,
                            },
                        },
                    },
                })
                : [];

            const todaysData = students.map((s) => {
                const isAbsent = todaysAbsentees.some((t) =>
                    t.student.enrollment_no === s.enrollment_no
                );
                return {
                    enrollment_no: s.enrollment_no,
                    name: s.name,
                    status: !isAbsent,
                };
            });

            const presentToday = todaysData.filter((t) => t.status).length;
            const attendancePercent = totalStudents > 0
                ? Math.round((presentToday / totalStudents) * 100)
                : 0;

            const firstSlot = teach.timetable[0] ?? null;
            const room = firstSlot ? firstSlot.room_no : "TBA";
            const schedule = firstSlot
                ? `${firstSlot.day} ${firstSlot.start} - ${firstSlot.end}`
                : "Not Scheduled";

            return {
                teachesId: teach.id,
                courseName: teach.course.course_name,
                totalStudents,
                presentToday,
                attendancePercent,
                room,
                schedule,
                attendanceRecords,
                todaysData,
                semester: teach.semester,
                dept: teach.dept,
            } as ClassData;
        }),
    );

    return results;
}
