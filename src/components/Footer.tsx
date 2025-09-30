"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaPlane, FaHotel } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-black dark:bg-gray-900 text-white py-8 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
          <FaEnvelope /> Join our newsletter for exclusive deals <FaPlane /> <FaHotel />
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"/>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-r-lg font-semibold transition-transform transform hover:scale-105">Subscribe</button>
        </div>
        <div className="flex justify-center gap-4 mb-4 text-gray-400">
          <a href="#"><FaFacebookF className="hover:text-blue-500 transition"/></a>
          <a href="#"><FaTwitter className="hover:text-blue-400 transition"/></a>
          <a href="#"><FaInstagram className="hover:text-pink-500 transition"/></a>
        </div>
        <p className="text-gray-400 text-sm">© 2025 TravelMate. All rights reserved.</p>
      </div>
    </footer>
  );
}
