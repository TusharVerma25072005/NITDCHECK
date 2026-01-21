
import HomeSection from "@repo/ui/home";
import Topbar from "@repo/ui/topbar";
import HowItWorks from "@repo/ui/howItWorks";
import Footer from "@repo/ui/footer"
import Schedule from "../components/schedule";
import AttendanceSection from "../components/subjectAttendanceSection";
import ProfileCard from "../components/profileCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";


export default async function Home() {
  const session = await getServerSession(authOptions)
  return (<main >
    
    <Topbar session={session}/>
    {
      !session ?
        <>
          <HomeSection />
          <HowItWorks />
        </> :
        <>
          <ProfileCard profile={{
            name: session.user?.name || "",
            enrollmentNo: session.user?.id || "",
            course: session.user?.course || "",
            semester: session.user?.semester || 0,
            dept : session.user?.dept || 0
          }} />
          <AttendanceSection />
        </>
    }
    <Schedule />
    <Footer />

  </main>
  );
}
