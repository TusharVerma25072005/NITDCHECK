'use server'

import prisma from "@repo/database/client"
export const getNonWorkingDates = async () =>{
    const nonWorking = await prisma.nonworkingdays.findMany({
        select: { date: true },
    });
    return nonWorking.map((n) => new Date(n.date.toDateString()));
}