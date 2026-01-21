"use client"
import React, { useState } from "react";
import Button from "@repo/ui/button";
import { updateAttendance } from "../lib/updateAttendance";
interface Student {
  name: string;
  enrollment_no: string;
  status: boolean; 
}

const AttendanceTable: React.FC<{ Data: Student[] , teachesId: string }> = ({ Data , teachesId }) => {
  const initialData: Student[] = Data

  const [students, setStudents] = useState<Student[]>(initialData);
  const presentCount = students.filter((s) => s.status === true).length;
  const absentCount = students.length - presentCount;
  const attendanceRate = Math.round((presentCount / students.length) * 100);

  const updateAll = (status: boolean) => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const resetChanges = () => {
    setStudents(initialData);
  };

  const toggleStatus = (enrollment_no: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.enrollment_no === enrollment_no ? { ...s, status: !s.status } : s))
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 md:w-3/4 w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">Manage Student Attendance</h2>

      <div className="flex gap-3 mb-4">
        
        <Button onClick={() => updateAll(true)} light={true}>
          Mark All Present
        </Button>
        <Button onClick={() => updateAll(false)} light={true}>
          Mark All Absent
        </Button>
        <Button onClick={resetChanges} light={true}>
          Reset Changes
        </Button>
        </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Roll Number</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Toggle Attendance</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {students.map((student) => (
              <tr key={student.enrollment_no} className="border-t">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.enrollment_no}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      student.status ? "bg-black" : "bg-red-600"
                    }`}
                  >
                    {student.status ? "Present" : "Absent"}
                  </span>
                </td>
                <td className="p-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={student.status}
                      onChange={() => toggleStatus(student.enrollment_no)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <Button onClick={() => {
          // Call server function to update attendance
          async function update(){
            return await updateAttendance(students , teachesId);
          }
          update().then(res => {
            console.log(res);
          });
        }}  light={false} >
          Save Attendance Changes
        </Button>
      </div>
      <div className="mt-6 bg-gray-50 p-4 rounded">
        <h3 className="font-semibold mb-4">Session Summary</h3>
        <div className="grid grid-cols-3 text-center">
          <div>
            <div className="text-green-600 font-bold">{presentCount}</div>
            <div className="text-sm">Present</div>
          </div>
          <div>
            <div className="text-red-600 font-bold">{absentCount}</div>
            <div className="text-sm">Absent</div>
          </div>
          <div>
            <div className="text-blue-600 font-bold">{attendanceRate}%</div>
            <div className="text-sm">Attendance Rate</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
