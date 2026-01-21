// components/SubjectDetailsModal.tsx
'use client';
import { X } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface SubjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  attended: number;
  total: number;
}

const COLORS = ['#28a745', '#dc3545'];

export default function SubjectDetailsModal({
  isOpen,
  onClose,
  subjectName,
  attended,
  total,
}: SubjectDetailsModalProps) {
  if (!isOpen) return null;

  const missed = total - attended;
  const attendanceRate = Math.round((attended / total) * 100);
  const needMore = Math.max(Math.ceil((0.75 * total - attended) / 0.25), 0);

  const data = [
    { name: 'Present', value: attended },
    { name: 'Absent', value: missed },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-8 ">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className='flex flex-row justify-between w-full'>
          <h3 className="font-semibold text-lg mb-4">Overall Attendance Distribution</h3>
            <span onClick={onClose} className='cursor-pointer font-bold text-xl md:hidden'> <X /> </span>
        </div>
          <PieChart width={350} height={350}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${(percent ? percent * 100 : 0).toFixed(1)}%`
              }
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
        <div className='flex justify-between'>
            <h3 className="font-semibold text-lg mb-4">Attendance Statistics</h3>
            <span onClick={onClose} className='cursor-pointer font-bold text-xl hidden md:block'> <X /> </span>
        </div>
          <div className="space-y-2">
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <strong>Total Classes:</strong> {total}
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-md">
              <strong>Classes Attended:</strong> {attended}
            </div>
            <div className="bg-red-100 px-4 py-2 rounded-md">
              <strong>Classes Missed:</strong> {missed}
            </div>
            <div className="bg-blue-100 px-4 py-2 rounded-md">
              <strong>Attendance Rate:</strong> {attendanceRate}%
            </div>
            <div className="bg-yellow-100 px-4 py-2 rounded-md">
              <strong>Tip:</strong> You need {needMore} more classes to reach 75% attendance target.
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
