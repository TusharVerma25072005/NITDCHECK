"use client";
import { useEffect, useState } from "react";
import SubjectAttendanceCard from "./subjectAttendanceCard";
import SubjectDetailsModal from "./detailedAnalytics";
import { SubjectAttendanceProps } from "./subjectAttendanceCard";
import { getAbsenteesData } from "../lib/getAbsentees";

export default function AttendanceSection() {
  const [subjectData, setSubjectData] = useState<SubjectAttendanceProps[]>([]);

  const [selectedSubject, setSelectedSubject] = useState<
    SubjectAttendanceProps | null
  >(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAbsenteesData();
      setSubjectData(data);
    };
    fetchData();
  }, []);
  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center p-10 pt-20"
    >
      <h2 className=" text-lg md:text-xl font-bold mb-6 w-2/3">
        Subject-wise Attendance
      </h2>
      <div className="md:w-2/3 flex flex-col justify-center ">
        {subjectData.map((subject, index) => (
          <SubjectAttendanceCard
            key={index}
            {...subject}
            onViewAllRecords={() => setSelectedSubject(subject)}
          />
        ))}
        {selectedSubject && (
          <SubjectDetailsModal
            isOpen={!!selectedSubject}
            onClose={() => setSelectedSubject(null)}
            subjectName={selectedSubject.subjectName}
            attended={selectedSubject.attended}
            total={selectedSubject.total}
          />
        )}
      </div>
    </section>
  );
}
