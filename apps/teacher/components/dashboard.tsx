"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import UploadClassPhoto from "../components/uploadPhoto";
import RecentAttendance from "../components/attendance";
import AttendanceTable from "../components/manageaAttendance";
import { useEffect } from "react";
import { getData } from "../lib/getData";

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
  dept: string;
}

export default function TeacherPortal({ teacherId }: { teacherId: string }) {
  const [classes, setClasses] = useState<ClassData[]>([]);

  const [selectedClass, setSelectedClass] = useState<ClassData>(classes[0]!);
  const [selectedAction, setSelectedAction] = useState<string>("Upload Photo");

  useEffect(() => {
    async function fetchData() {
      const data = await getData({ teacherId });
      console.log("Fetched data:", data);
      setClasses(data);
      setSelectedClass(data[0] || selectedClass);
    }
    fetchData();
  }, []);

  return (classes.length === 0) ? <div>Loading...</div> : (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teacher Portal</h1>

      <div className="mb-6">
        <label className="font-semibold">Select Class:</label>
        <div className="relative inline-block ml-2">
          <select
            value={selectedClass.courseName}
            onChange={(e) =>
              setSelectedClass(
                classes.find((c) => c.courseName === e.target.value)!,
              )}
            className="border rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {classes.map((cls) => (
              <option key={cls.courseName}>{cls.courseName}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 pointer-events-none text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-3xl font-bold">{selectedClass.totalStudents}</p>
          <p className="text-gray-500">Total Students</p>
          <p className="text-sm text-gray-400">
            {selectedClass.courseName.split(" ")[0]}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-3xl font-bold">
            {selectedClass.presentToday == -1
              ? "N/A"
              : selectedClass.presentToday}
          </p>
          <p className="text-gray-500">Present Today</p>
          <p className="text-sm text-gray-400">
            {selectedClass.presentToday == -1
              ? "N/A"
              : `${selectedClass.attendancePercent}% attendance`}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-3xl font-bold">{selectedClass.room}</p>
          <p className="text-gray-500">Classroom</p>
          <p className="text-sm text-gray-400">{selectedClass.schedule}</p>
        </div>
      </div>

      <div>
        <div className="flex gap-4 bg-gray-100 rounded-full px-2 py-1 my-4">
          {["Upload Photo", "View Attendance", "Student Records"].map(
            (label) => (
              <button
                key={label}
                className="flex-1 rounded-full py-1 hover:bg-gray-200 transition"
                onClick={() => setSelectedAction(label)}
              >
                {label}
              </button>
            ),
          )}
        </div>

        {selectedAction === "Upload Photo" && (
          <UploadClassPhoto
            dept = {selectedClass.dept}
            semester={selectedClass.semester}
            teachesId={selectedClass.teachesId}
            date={new Date().toISOString().split("T")[0]}
          />
        )}
        {selectedAction === "View Attendance" && (
          <RecentAttendance sessions={selectedClass.attendanceRecords} />
        )}
        {selectedAction === "Student Records" && <AttendanceTable Data={selectedClass.todaysData} teachesId = {selectedClass.teachesId} />}
      </div>
    </div>
  );
}
