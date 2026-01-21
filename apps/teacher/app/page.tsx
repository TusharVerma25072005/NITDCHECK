import Topbar from "@repo/ui/topbar";
import HowItWorks from "@repo/ui/howItWorks";
import HomeSection from "@repo/ui/home";
import Footer from "@repo/ui/footer";
import TeacherPortal from "../components/dashboard";
import  { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const teacherId = session?.user?.id || "";
  console.log("Teacher ID:", teacherId);
  console.log(session);

  return (
    <main>
      <Topbar session={session} />
      {
        !session ?
          <>
            <HomeSection />
            <HowItWorks />
          </> :
          <>
            <TeacherPortal teacherId={teacherId} />
          </>
      }
      <Footer />

    </main>
  );
}
