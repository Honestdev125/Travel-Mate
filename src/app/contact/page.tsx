"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { SiImessage } from "react-icons/si";

export default function ContactPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [modalState, setModalState] = useState<{
    show: boolean;
    success: boolean;
  }>({ show: false, success: false });

  const handleSubmit = () => {
    const { name, email, message } = userInfo;
    if (!name || !email || !message) {
      setModalState({ show: true, success: false });
      return;
    }
    setModalState({ show: true, success: true });
    setUserInfo({ name: "", email: "", message: "" });
  };

  const handleClose = () => setModalState((prev) => ({ ...prev, show: false }));

  return (
    <div className="min-h-screen bg-white text-black py-16 px-6 md:px-20">
      <h1 className="text-4xl flex justify-center md:text-5xl mt-30 font-extrabold mb-8 text-center">
        Contact Us 
        <SiImessage className="mt-1 ml-1" />
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Have questions or feedback? Send us a message!
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-blue-500 text-2xl" />
            <div>
              <h3 className="font-bold">Address</h3>
              <p>123 Travel Lane, Adventure City</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-green-500 text-2xl" />
            <div>
              <h3 className="font-bold">Email</h3>
              <p>support@travelhub.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-purple-500 text-2xl" />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+1 234 567 890</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <textarea
              placeholder="Your Message"
              className="border px-4 py-3 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={userInfo.message}
              onChange={(e) =>
                setUserInfo({ ...userInfo, message: e.target.value })
              }
            />
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalState.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <FaTimes />
            </button>
            {modalState.success ? (
              <>
                <h3 className="text-2xl font-bold mb-2 text-green-600">
                  Message Sent! 🎉
                </h3>
                <p>
                  Thank you for contacting us. We will get back to you soon.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2 text-red-500">
                  Failed 😢
                </h3>
                <p>Please fill all required fields before sending.</p>
              </>
            )}
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
