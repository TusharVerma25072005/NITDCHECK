interface profile{
    name : string;
    enrollmentNo : string;
    course : string;
    semester : number;
    dept : number;
}

export default function ProfileCard({ profile }: { profile: profile }) {
    return (
        <section  className="px-8 flex justify-center items-center my-10 ">
        <div className="p-4 border rounded-lg w-full md:w-2/3">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p>Enrollment No: {profile.enrollmentNo}</p>
            <p>Course: {profile.course}</p>
            <p>Semester: {profile.semester}</p>
            <p>Department: {profile.dept}</p>
        </div>
        </section>
    );
}