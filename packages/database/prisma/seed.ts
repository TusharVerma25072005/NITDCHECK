// prisma/seed.ts
import { PrismaClient, Department, Course, Days } from "@prisma/client";

const prisma = new PrismaClient();

async function seedStudents() {
  const students = [
    {
      enrollment_no: "231210098",
      name: "SHRISU RAY",
      email: "231210098@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210099",
      name: "SHUBHAM KUMAR",
      email: "231210099@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210100",
      name: "SHWETANSHU SINHA",
      email: "231210100@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210101",
      name: "SNEHA GUPTA",
      email: "231210101@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210102",
      name: "SONAM WARKADE",
      email: "231210102@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210103",
      name: "SOURABH MALIK",
      email: "231210103@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210104",
      name: "SOUVIK DAS",
      email: "231210104@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210105",
      name: "SUMIT KUMAR",
      email: "231210105@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210106",
      name: "SUMIT KUMAR DHAWAN",
      email: "231210106@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210107",
      name: "SUNNY KUMAR",
      email: "231210107@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210108",
      name: "SURAJ KUMAR SAW",
      email: "231210108@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210109",
      name: "SURMAI ROSHAN",
      email: "231210109@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210110",
      name: "SWAYAM SAINI",
      email: "231210110@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210111",
      name: "SYED ZAID IMAM",
      email: "231210111@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210112",
      name: "TANISH RAMKISHOR JAGETIYA",
      email: "231210112@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210113",
      name: "TANISHQ",
      email: "231210113@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210114",
      name: "TANMAY BHARDWAJ",
      email: "231210114@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210115",
      name: "TASHIK MIDDHA",
      email: "231210115@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210116",
      name: "TUSHAR KUMAR SHARMA",
      email: "231210116@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210117",
      name: "TUSHAR VERMA",
      email: "231210117@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210118",
      name: "VASHU KUMAR",
      email: "231210118@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210119",
      name: "VEDANT DUBEY",
      email: "231210119@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210120",
      name: "VIKASH",
      email: "231210120@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210121",
      name: "VIKASH KUMAR ADIVASI",
      email: "231210121@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210122",
      name: "VINAYAK PAWAR",
      email: "231210122@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210123",
      name: "VINEET",
      email: "231210123@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210124",
      name: "VIRAJ TYAGI",
      email: "231210124@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210125",
      name: "VIVEK BHARDWAJ",
      email: "231210125@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210126",
      name: "VIVIDH KANAUJIA",
      email: "231210126@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210127",
      name: "YASH SHARMA",
      email: "231210127@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210128",
      name: "YELISHALA JAHNAVI",
      email: "231210128@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
    {
      enrollment_no: "231210129",
      name: "YUVRAJ PEGU",
      email: "231210129@nitdelhi.ac.in",
      password: "pass123",
      dept: Department.CSE,
      semester: 5,
      year: 2027,
      course: Course.BTech,
    },
  ];

  for (const student of students) {
    await prisma.student.upsert({
      where: { enrollment_no: student.enrollment_no },
      update: {},
      create: student,
    });
  }

  console.log("  Students seeded successfully");
}

async function addTeachers() {
  await prisma.teacher.createMany({
    data: [
      {
        id: "CSE001",
        name: "Dr Sahil",
        dept: Department.CSE,
        password: "pass123",
        email: "sahil@nitdelhi.ac.in",
      },
      {
        id: "CSE002",
        name: "Dr Anurag",
        dept: Department.CSE,
        password: "pass123",
        email: "anurag@nitdelhi.ac.in",
      },
      {
        id: "CSE003",
        name: "VS Pandey",
        dept: Department.CSE,
        password: "pass123",
        email: "vspandey@nitdelhi.ac.in",
      },
      {
        id: "CSE004",
        name: "Dr Muneesh",
        dept: Department.CSE,
        password: "pass123",
        email: "muneesh@nitdelhi.ac.in",
      },
      {
        id: "CSE005",
        name: "Dr Nisha",
        dept: Department.CSE,
        password: "pass123",
        email: "nisha@nitdelhi.ac.in",
      },
    ],
    skipDuplicates: true,
  });

  console.log(" Teachers seeded successfully");
}

async function addCourses() {
  await prisma.courses.createMany({
    data: [
      {
        course_code: "CSBB301",
        course_name: "Computer Networks",
      },
      {
        course_code: "CSBB303",
        course_name: "Data Mining",
      },
      {
        course_code: "CSBB304",
        course_name: "Quantum Computing",
      },
      {
        course_code: "CSBB311",
        course_name: "Theory of Computation",
      },
      {
        course_code: "CSBB302",
        course_name: "Machine Learning",
      },
    ],
    skipDuplicates: true,
  });

  console.log("  Courses seeded successfully");
}

async function addTeaches() {
  await prisma.teaches.createMany({
    data: [
      {
        teacher_id: "CSE004",   // Dr Muneesh
        course_code: "CSBB301", // Computer Networks
        semester: 5,
      },
      {
        teacher_id: "CSE002",   // Dr Anurag
        course_code: "CSBB303", // Data Mining
        semester: 5,
      },
      {
        teacher_id: "CSE003",   // VS Pandey
        course_code: "CSBB304", // Quantum Computing
        semester: 5,
      },
      {
        teacher_id: "CSE001",   // Dr sahil
        course_code: "CSBB311", // Theory of Computation
        semester: 5,
      },
      {
        teacher_id: "CSE005",   // Dr Nisha
        course_code: "CSBB301", // CN
        semester: 5,
      },
      {
        teacher_id: "CSE001",   // Dr Sahil
        course_code: "CSBB302", // Machine Learning
        semester: 5,
      }
    ],
    skipDuplicates: true,
  });

  console.log("  Teaches seeded successfully");
}

async function addTimetable() {
  const slots: {
    day: Days;
    start: string;
    end: string;
    course_code: string;
    teacher_id: string;
  }[] = [
    // MONDAY
    { day: Days.MONDAY,    start: "14:30", end: "15:30", course_code: "CSBB301", teacher_id: "CSE004" }, // CN - Muneesh
    { day: Days.MONDAY,    start: "15:30", end: "16:30", course_code: "CSBB303", teacher_id: "CSE002" }, // DM - Anurag
    { day: Days.MONDAY,    start: "16:30", end: "17:30", course_code: "CSBB302", teacher_id: "CSE001" }, // ML - Sahil

    // TUESDAY
    { day: Days.TUESDAY,   start: "13:30", end: "14:30", course_code: "CSBB311", teacher_id: "CSE001" }, // TOC - Sahil
    { day: Days.TUESDAY,   start: "14:30", end: "15:30", course_code: "CSBB304", teacher_id: "CSE003" }, // QC  - Pandey
    { day: Days.TUESDAY,   start: "15:30", end: "16:30", course_code: "CSBB303", teacher_id: "CSE002" }, // DM  - Anurag
    { day: Days.TUESDAY,   start: "16:30", end: "17:30", course_code: "CSBB302", teacher_id: "CSE001" }, // ML  - Sahil

    // WEDNESDAY
    { day: Days.WEDNESDAY, start: "14:30", end: "15:30", course_code: "CSBB304", teacher_id: "CSE003" }, // QC  - Pandey
    { day: Days.WEDNESDAY, start: "15:30", end: "16:30", course_code: "CSBB311", teacher_id: "CSE001" }, // TOC - Sahil (alias CS103 in image)
    { day: Days.WEDNESDAY, start: "16:30", end: "17:30", course_code: "CSBB301", teacher_id: "CSE004" }, // CN  - Muneesh

    // THURSDAY
    { day: Days.THURSDAY,  start: "15:30", end: "16:30", course_code: "CSBB303", teacher_id: "CSE002" }, // DM  - Anurag
    { day: Days.THURSDAY,  start: "16:30", end: "17:30", course_code: "CSBB302", teacher_id: "CSE001" }, // ML  - Sahil

    // FRIDAY
    { day: Days.FRIDAY,    start: "13:30", end: "14:30", course_code: "CSBB311", teacher_id: "CSE001" }, // TOC - Sahil
    { day: Days.FRIDAY,    start: "14:30", end: "15:30", course_code: "CSBB301", teacher_id: "CSE004" }, // CN  - Muneesh
    { day: Days.FRIDAY,    start: "15:30", end: "16:30", course_code: "CSBB302", teacher_id: "CSE001" }, // ML  - Sahil
    { day: Days.FRIDAY,    start: "16:30", end: "17:30", course_code: "CSBB304", teacher_id: "CSE003" }, // QC  - Pandey
  ];

  for (const s of slots) {
    const teaches = await prisma.teaches.findFirst({
      where: {
        teacher_id: s.teacher_id,
        course_code: s.course_code,
        semester: 5,
      },
      select: { id: true },
    });

    if (!teaches) {
      throw new Error(
        `Missing Teaches row for teacher_id=${s.teacher_id}, course_code=${s.course_code}, semester=5`
      );
    }

    await prisma.timetable.upsert({
      where: {
        teaches_id_day_start: {
          teaches_id: teaches.id,
          day: s.day,
          start: s.start,
        },
      },
      update: { end: s.end },
      create: {
        teaches_id: teaches.id,
        day: s.day,
        start: s.start,
        end: s.end,
      },
    });
  }

}

async function addNonWorkingDays() {
  const nonWorkingDays : { date: Date, day: Days, description: string }[] = []
  let sd = new Date("2025-08-09");
  let ed = new Date("2025-12-17");
  while(sd <= ed) {
    nonWorkingDays.push({
      date: new Date(sd),
      day: Days.SATURDAY,
      description: "Weekend"
    });
    sd.setDate(sd.getDate() + 7);
  }
  sd = new Date("2025-08-10");
  while(sd <= ed) {
    nonWorkingDays.push({
      date: new Date(sd),
      day: Days.SUNDAY,
      description: "Weekend"
    });
    sd.setDate(sd.getDate() + 7);
  }
  nonWorkingDays.push(
    { date: new Date("2025-08-15"), day: Days.FRIDAY, description: "Independence Day" },
    { date: new Date("2025-08-16"), day: Days.SATURDAY, description: "Janmashtami" },
    { date: new Date("2025-09-05"), day: Days.FRIDAY, description: "Eid-e-Milad" },
    { date: new Date("2025-10-02"), day: Days.THURSDAY, description: "Gandhi Jayanti" },
    { date: new Date("2025-10-09"), day: Days.THURSDAY, description: "Mid-Sem Exam"},
    { date: new Date("2025-10-10"), day: Days.FRIDAY, description: "Mid-Sem Exam"},
    { date: new Date("2025-10-13"), day: Days.MONDAY, description: "Mid-Sem Exam"},
    { date: new Date("2025-10-14"), day: Days.TUESDAY, description: "Mid-Sem Exam"},
    { date: new Date("2025-10-15"), day: Days.WEDNESDAY, description: "Mid-Sem Exam"},
    { date: new Date("2025-10-16"), day: Days.THURSDAY, description: "Mid-Sem Exam"},
    { date: new Date("2025-10-17"), day: Days.FRIDAY, description: "Mid-Sem Exam"},
    { date: new Date("2025-10-20"), day: Days.MONDAY, description: "Diwali"},
    { date: new Date("2025-10-21"), day: Days.TUESDAY, description: "Diwali"},
    { date: new Date("2025-10-22"), day: Days.WEDNESDAY, description: "Diwali"},
    { date: new Date("2025-10-23"), day: Days.THURSDAY, description: "Diwali"},
    { date: new Date("2025-10-24"), day: Days.FRIDAY, description: "Diwali"},
    { date: new Date("2025-11-05"), day: Days.WEDNESDAY, description: "Guru Nanak Jayanti"},
    { date: new Date("2025-11-14"), day: Days.FRIDAY, description: "Fest"},
    { date: new Date("2025-11-15"), day: Days.SATURDAY, description: "Fest"},
    { date: new Date("2025-11-16"), day: Days.SUNDAY, description: "Fest"},
    { date: new Date("2025-12-03"), day: Days.WEDNESDAY, description: "Prep Leave"},
    { date: new Date("2025-12-04"), day: Days.THURSDAY, description: "Prep Leave"},
    { date: new Date("2025-12-05"), day: Days.FRIDAY, description: "Prep Leave"},
    { date: new Date("2025-12-08"), day: Days.MONDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-09"), day: Days.TUESDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-10"), day: Days.WEDNESDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-11"), day: Days.THURSDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-12"), day: Days.FRIDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-13"), day: Days.SATURDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-15"), day: Days.MONDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-16"), day: Days.TUESDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-17"), day: Days.WEDNESDAY, description: "End-Sem Exam"},
    { date: new Date("2025-12-25"), day: Days.THURSDAY, description: "Christmas"},
  );

  for(const nwd of nonWorkingDays){
    await prisma.nonworkingdays.upsert({
      where: { date: nwd.date },
      update: { day: nwd.day, description: nwd.description },
      create: { date: nwd.date, day: nwd.day, description: nwd.description },
    });
  }
  console.log(" Non-Working Days seeded successfully");
}

async function main(){
  console.log("Seeding database...");
  await seedStudents();
  await addTeachers();
  await addCourses();
  await addTeaches();
  await addTimetable();
  await addNonWorkingDays();
  console.log("Seeding completed.");
}

main()
