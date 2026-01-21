import { Zap, Lock, BarChart3, Heart, Users } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: "Join Your Class",
            desc: "Simply be present in your classroom when the instructor takes the attendance photo",
        },
        {
            number: 2,
            title: "Get Recognized",
            desc: "Our AI instantly identifies you from the class photo using facial recognition",
        },
        {
            number: 3,
            title: "View Your Record",
            desc: "Check your attendance status in real-time through the student portal",
        },
    ];

    const features = [
        {
            icon: <Zap className="w-8 h-8 text-gray-800" />,
            title: "Lightning Fast",
            desc: "Mark attendance for entire class in under 30 seconds",
        },
        {
            icon: <Lock className="w-8 h-8 text-gray-800" />,
            title: "Secure",
            desc: "Advanced encryption protects all student data and photos",
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-gray-800" />,
            title: "Analytics",
            desc: "Detailed reports and attendance analytics for students",
        },
        {
            icon: <Heart className="w-8 h-8 text-gray-800" />,
            title: "User Friendly",
            desc: "Intuitive interface designed specifically for students",
        },
    ];

    return (
        <section id="about" className=" pt-24 bg-gray-100 flex flex-col items-center min-h-screen ">
            <div className="w-2/3 mt-8">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold mb-2">How NITDCHECK Works</h2>
                    <p className="text-gray-600">
                        Our cutting-edge face recognition technology makes attendance tracking
                        effortless for both students and faculty
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">For Students</h3>
                        {steps.map((step) => (
                            <div key={step.number} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                    {step.number}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{step.title}</h4>
                                    <p className="text-gray-600">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center border rounded-lg p-8 bg-white">
                        <div className="flex justify-center items-center h-40 text-gray-400 bg-gray-100  rounded-md">
                            <Users className="w-16 h-16" />
                        </div>
                        <h4 className="font-semibold mt-4">
                            Class Photo Recognition
                        </h4>
                        <p className="text-gray-600 text-sm my-4">
                            One photo captures the entire class attendance in seconds
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-8 mt-16 text-center ">
                    {features.map((f) => (
                        <div key={f.title}>
                            <div className="mb-3 flex justify-center">
                                <span className="rounded-full bg-gray-200 p-4">
                                    {f.icon}
                                </span>
                            </div>
                            <h5 className="font-semibold">{f.title}</h5>
                            <p className="text-gray-600 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}