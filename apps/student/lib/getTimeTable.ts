"use server";
import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export type ClassItem = {
    time: string;
    subject_code: string;
    subject: string;
    room: string;
};

export const getTimeTable = async (): Promise<ClassItem[]> => {
    const session = await getServerSession(authOptions);

    if (
        !session?.user?.id || !session?.user?.dept || !session?.user?.semester
    ) {
        return [];
    }

    const todayDay = new Date()
        .toLocaleString("en-IN", { weekday: "long" })
        .toUpperCase();

    const timeTable = await prisma.teaches.findMany({
        where: {
            dept: session.user.dept as any,
            semester: session.user.semester,
        },
        include: {
            course: {
                select: { course_name: true, course_code: true },
            },
            timetable: {
                where: { day: todayDay as any },
                select: { day: true, start: true, end: true, room_no: true },
            },
        },
    });

    const result: ClassItem[] = timeTable.flatMap((tt) =>
        tt.timetable.map((cls) => ({
            time: `${cls.start} - ${cls.end}`,
            subject_code: tt.course.course_code,
            subject: tt.course.course_name,
            room: cls.room_no,
        }))
    );
    result.sort((a, b) => (a.time > b.time ? 1 : -1));

    return result;
};
