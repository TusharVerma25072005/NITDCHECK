import { Twitter, Linkedin, Bird } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-gray-800 border-t pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-xl font-bold mb-2">NITDCHECK</h2>
                    <p className="text-sm mb-2">
                        Revolutionizing attendance tracking with cutting-edge face
                        recognition technology. Making education more efficient, one photo
                        at a time.
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" aria-label="Twitter" >
                            <Twitter size={18} />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Time Table</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Calendar</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t mt-6">
                <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-center text-gray-500">
                    © 2025 NITDCHECK. All rights reserved. Powered by AI Face Recognition Technology.
                </div>
            </div>
        </footer>
    );
}
