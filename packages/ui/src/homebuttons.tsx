"use client"

import Button from "./button"
export default function HomeButtons(){
    return <div className="flex gap-4">
        <Button onClick={() => console.log("Check Attendance clicked")}>
          Check Attendance
        </Button>
        <Button onClick={() => console.log("View Time Table clicked")} light>
          View Time Table
        </Button>
      </div>
}