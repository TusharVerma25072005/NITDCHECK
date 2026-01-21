import { getNonWorkingDates } from "../lib/getNonWorkingDays";
import TodaysClasses from "./timeTable";
import Calendar from "@repo/ui/calendar";
export default async function Schedule(){
    const nonWorkingDates = await getNonWorkingDates( );
    return <section id= "calendar" className="flex items-center flex-col justify-center py-12 min-h-screen">
        <div className="text-center p-8 ">
        <h1 className="text-4xl font-bold my-2">Calendar</h1>
        <p className="text-lg text-gray-600">Your academic calendar for the semester</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TodaysClasses />
            <Calendar nonWorkingDates={nonWorkingDates} />
        </div>
        
    </section>
}