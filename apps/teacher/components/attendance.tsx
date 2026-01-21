"use client";
import React from "react";

interface AttendanceSession {
  date: string;
  present: number;
  absent: number;
}


export default function RecentAttendance( {sessions}: {sessions: AttendanceSession[]} ) {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-3/4 mx-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Attendance Sessions</h2>
      <div className="space-y-3">
        {sessions.map((session, idx) => {
          const total = session.present + session.absent;
          const percent = Math.round((session.present / total) * 100);

          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-lg p-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="text-gray-500 w-24">{session.date}</span>
                <span className="text-sm font-medium">
                  {session.present} Present, {session.absent} Absent
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:w-48">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
