import Card from "./card";
import { Camera, Clock, CheckCircle } from "lucide-react";
import HomeButtons from "./homebuttons";
export default function HomeSection() {
  return (
    <section id="home" className="flex flex-col items-center justify-center text-center min-h-screen ">
      <div>
        <h1 className="text-6xl font-bold mb-8  ">
          Welcome to <span className="text-[#050013]">NITDCHECK</span>
        </h1>
        <p className="max-w-2xl text-gray-600 mb-8">
          Revolutionary face recognition attendance system that makes marking attendance as simple as taking a class photo.
          Say goodbye to manual roll calls and hello to instant, accurate attendance tracking.
        </p>
      </div>
      <HomeButtons />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pb-8 m-4 w-2/3 ">
        <Card
          icon={<Camera />}
          title="Face Recognition"
          description="Advanced AI technology identifies students instantly from class photos."
        />
        <Card
          icon={<Clock />}
          title="Real-time Tracking"
          description="Real-time attendance marking with immediate verification and reporting"
        />
        <Card
          icon={<CheckCircle />}
          title="100% Accurate"
          description="Eliminate manual errors and ensure precise attendance records"
        />
      </div>
    </section>
  );
}
