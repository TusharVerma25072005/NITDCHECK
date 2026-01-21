'use client';

import React from 'react';
import Button from '@repo/ui/button';
type AttendanceStatus = 'Present' | 'Absent';

export type ClassRecord = {
    date: string; // format: DD/MM/YYYY or MM/DD/YYYY
    time: string;
    status: AttendanceStatus;
};

export type SubjectAttendanceProps = {
    subjectCode: string;
    subjectName: string;
    instructor: string;
    attended: number;
    total: number;
    recentClasses: ClassRecord[];
};



const getStatusColor = (status: AttendanceStatus) => {
    return status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

const getDotColor = (status: AttendanceStatus) => {
    return status === 'Present' ? 'bg-green-500' : 'bg-red-500';
};

export default function SubjectAttendanceCard({
    subjectCode,
    subjectName,
    instructor,
    attended,
    total,
    recentClasses,
    onViewAllRecords
}: SubjectAttendanceProps & { onViewAllRecords: () => void }) {
    const percentage = Math.round((attended / total) * 100);

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start gap-6 border mb-6">
            <div className="w-full md:w-2/3">
                <h3 className="text-lg font-semibold">{subjectName} <span className="text-sm bg-gray-100 px-2 py-1 rounded ml-2">{subjectCode}</span></h3>
                <p className="text-sm text-gray-500">Instructor: {instructor}</p>

                <div className="mt-3 flex items-center gap-3 text-sm font-medium">
                    <span>{attended} / {total} classes</span>
                    <span className="text-green-600">• {percentage}%</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded mt-2">
                    <div
                        className={`bg-black h-full rounded`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="w-full md:w-1/3">
                <h4 className="text-sm font-semibold mb-2">Recent Classes</h4>
                <div className="space-y-2 text-sm">
                    {recentClasses.map((cls, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${getDotColor(cls.status)}`} />
                                <span>{cls.date}</span>
                            </div>
                            <span>{cls.time}</span>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(cls.status)}`}>
                                {cls.status}
                            </span>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col my-2'>
                    <Button onClick={() => { onViewAllRecords() }} light={true}>View All Records</Button>
                </div>
            </div>
        </div>
    );
}
