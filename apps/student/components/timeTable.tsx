"use client";

import React from "react";
import { useEffect } from "react";
import { getTimeTable } from "../lib/getTimeTable";
type ClassItem = {
  time: string;
  subject_code: string;
  subject: string;
  room: string;
};

const classesToday: ClassItem[] = [
  {
    time: "9:00 AM",
    subject: "Mathematics",
    room: "Room 101",
    subject_code: "MATH101",
  },
  {
    time: "10:30 AM",
    subject: "Physics",
    room: "Lab 202",
    subject_code: "PHY201",
  },
  {
    time: "12:00 PM",
    subject: "Chemistry",
    room: "Lab 303",
    subject_code: "CHEM301",
  },
  {
    time: "2:00 PM",
    subject: "Computer Science",
    room: "Room 401",
    subject_code: "CS401",
  },
  {
    time: "3:30 PM",
    subject: "English",
    room: "Room 205",
    subject_code: "ENG105",
  },
];

export default function TodaysClasses() {
  const [classesToday, setClassesToday] = React.useState<ClassItem[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getTimeTable();
      setClassesToday(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border max-w-xl w-full">
      <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>

      <div className="flex flex-col gap-4">
        {classesToday.map((classItem, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border hover:shadow-sm transition"
          >
            <div className="w-full">
              <p className="text-sm text-gray-500">{classItem.time}</p>
              <p className="font-semibold w-full flex justify-between items-center  py-2 ">
                <span>{classItem.subject_code}</span>
                <span>{classItem.subject}</span>
              </p>

              <p className="text-xs text-gray-400">{classItem.room}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
