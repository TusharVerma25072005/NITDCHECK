"use server";

interface Student {
    name: string;
    enrollment_no: string;
    status: boolean;
}

import prisma from "@repo/database/client";

export const updateAttendance = async (
    updates: Student[],
    teachesId: string,
) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const removals = updates.filter((s) => s.status === true).map((s) =>
        s.enrollment_no
    );
    const insertions = updates.filter((s) => s.status === false).map((s) =>
        s.enrollment_no
    );
    await prisma.absentees.deleteMany({
        where: {
            teaches_id: teachesId,
            date: today,
            enrollment_no: { in: removals },
        },
    });

    await prisma.$transaction(
        insertions.map((enrollment_no) =>
            prisma.absentees.upsert({
                where: {
                    enrollment_no_teaches_id_date: {
                        enrollment_no,
                        teaches_id: teachesId,
                        date: today,
                    },
                },
                update: {},
                create: {
                    enrollment_no,
                    teaches_id: teachesId,
                    date: today,
                },
            })
        ),
    );

    return { message: "Attendance updated successfully" };
};
