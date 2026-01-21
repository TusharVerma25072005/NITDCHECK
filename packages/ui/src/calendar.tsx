"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Button from "./button";

type CalendarProps = {
  nonWorkingDates: Date[];
};

export default function Calendar({ nonWorkingDates }: CalendarProps) {
  const [selected, setSelected] = useState<Date>();


  const startMonth = new Date(2025, 8);
  const endMonth = new Date(2025, 12);
  return (
    <div className="flex flex-col px-4 w-full items-center">
      
      
        <div className=" flex justify-center p-6 border rounded-xl bg-white mb-2  max-w-xl mx-auto">
          
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            modifiers={{
              today: new Date(),
              workingDay: nonWorkingDates,
            }}
            modifiersClassNames={{
              today: 'bg-gray-500 text-white rounded-lg',
              selected: 'bg-blue-500 text-white rounded-lg',
              workingDay: 'bg-gray-100 rounded-lg',
            }}
            classNames={{
              day: 'text-xs sm:text-sm md:text-base w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 flex items-center justify-center',
              month_grid: 'w-full',
              weekdays: 'flex w-full',
              weekday: 'flex-1 text-center font-medium text-gray-500 text-xs sm:text-sm',
              week: 'flex w-full',
              day_button: 'w-full h-full flex items-center justify-center rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors',
              outside: 'text-gray-400',
            }}
            fromMonth={startMonth}
            toMonth={endMonth}
          />

        </div>

      <Button onClick={() => { }} light={false}>
        Download full Calendar
      </Button>
      
    </div>
  );
}
