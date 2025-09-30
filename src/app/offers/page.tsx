"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { GiFallingStar } from "react-icons/gi";

// Define country type
type Country = { code: string; name: string; img: string };

// Define hotel type
type Hotel = {
  name: string;
  country: Country;
  rating: number;
  price: number;
  discount: number;
  id: string;
};

// List of countries with flag images
const countries: Country[] = [
  { code: "FR", name: "France", img: "https://flagcdn.com/w20/fr.png" },
  { code: "US", name: "United States", img: "https://flagcdn.com/w20/us.png" },
  { code: "AE", name: "UAE", img: "https://flagcdn.com/w20/ae.png" },
  { code: "TR", name: "Turkey", img: "https://flagcdn.com/w20/tr.png" },
  { code: "DE", name: "Germany", img: "https://flagcdn.com/w20/de.png" },
  { code: "GB", name: "United Kingdom", img: "https://flagcdn.com/w20/gb.png" },
  { code: "IT", name: "Italy", img: "https://flagcdn.com/w20/it.png" },
  { code: "ES", name: "Spain", img: "https://flagcdn.com/w20/es.png" },
];

// Generate sample hotel offers
const generateHotels = (): Hotel[] => {
  const hotelNames = ["Grand Resort", "Sunshine Hotel", "Ocean View", "Mountain Inn", "Royal Palace"];
  return hotelNames.map((name, idx) => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
    const price = Math.floor(Math.random() * 300) + 100;
    const discount = Math.floor(Math.random() * 50) + 10; // 10% to 60%
    return { id: `hotel-${idx}`, name, country, rating, price, discount };
  });
};

export default function OffersPage() {
  // State to store hotels
  const [hotels, setHotels] = useState<Hotel[]>([]);

  // State to manage modal (booking form / success / failed)
  const [modalState, setModalState] = useState<{
    show: boolean;
    hotel?: Hotel;
    step?: "form" | "success" | "failed";
  }>({ show: false });

  // State to store user input in booking form
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });

  // State to track sold out hotels
  const [soldOutHotels, setSoldOutHotels] = useState<string[]>([]);

  // Load hotels and sold out hotels from localStorage on mount
  useEffect(() => {
    setHotels(generateHotels());
    const sold = JSON.parse(localStorage.getItem("soldOutHotels") || "[]");
    setSoldOutHotels(sold);
  }, []);

  // Open booking modal for a hotel
  const handleBook = (hotel: Hotel) => {
    if (soldOutHotels.includes(hotel.id)) return; // Cannot book sold-out hotels
    setModalState({ show: true, hotel, step: "form" });
    setUserInfo({ name: "", email: "", phone: "" });
  };

  // Close modal
  const handleClose = () => setModalState({ show: false });

  // Confirm booking
  const handleConfirm = () => {
    const { name, email, phone } = userInfo;

    // If any required field is empty, show failed step
    if (!name || !email || !phone) {
      setModalState(prev => prev.hotel ? { ...prev, step: "failed" } : prev);
      return;
    }

    // Add hotel to sold out list and save to localStorage
    const id = modalState.hotel!.id;
    const updatedSold = [...soldOutHotels, id];
    setSoldOutHotels(updatedSold);
    localStorage.setItem("soldOutHotels", JSON.stringify(updatedSold));

    // Show success step
    setModalState(prev => prev.hotel ? { ...prev, step: "success" } : prev);
  };

  return (
    <div className="min-h-screen py-16 px-6 md:px-20 bg-white text-black">
      {/* Page heading */}
      <h1 className="text-4xl flex justify-center mt-30 md:text-5xl font-extrabold mb-8 text-center">
        Special Hotel Offers 
        <GiFallingStar  />
      </h1>

      {/* Hotel cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hotels.map(h => {
          const soldOut = soldOutHotels.includes(h.id);
          return (
            <motion.div
              key={h.id}
              whileHover={{ scale: 1.05 }}
              className={`bg-white rounded-3xl shadow-lg p-6 relative cursor-pointer transition ${soldOut ? "opacity-50" : ""}`}
            >
              {/* SOLD OUT overlay */}
              {soldOut && <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-xl rounded-3xl">SOLD OUT</div>}

              {/* Hotel name */}
              <h3 className="text-xl font-bold mb-2">{h.name}</h3>

              {/* Country info with flag */}
              <div className="flex items-center gap-2 mb-2">
                <Image src={h.country.img} alt={h.country.name} width={24} height={24} className="rounded-full" />
                <span>{h.country.name}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2"><FaStar className="text-yellow-400" /> {h.rating}</div>

              {/* Price & discount */}
              <div className="font-semibold text-lg mb-4">
                Price: ${h.price} <span className="text-red-500">({h.discount}% off)</span>
              </div>

              {/* Book Now button */}
              <button
                disabled={soldOut}
                onClick={() => handleBook(h)}
                className={`w-full py-2 rounded-xl text-white font-semibold transition transform hover:scale-105 ${soldOut ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600"}`}
              >
                Book Now
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {modalState.show && modalState.hotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><FaTimes /></button>

            {/* Booking form */}
            {modalState.step === "form" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold mb-4 text-center">Booking - {modalState.hotel.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Image src={modalState.hotel.country.img} alt={modalState.hotel.country.name} width={24} height={24} className="rounded-full" />
                  <span>{modalState.hotel.country.name}</span>
                </div>

                {/* User inputs */}
                <input type="text" placeholder="Full Name" className="border px-3 py-2 rounded-xl" value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})} />
                <input type="email" placeholder="Email" className="border px-3 py-2 rounded-xl" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} />
                <input type="tel" placeholder="Phone Number" className="border px-3 py-2 rounded-xl" value={userInfo.phone} onChange={e => setUserInfo({...userInfo, phone: e.target.value})} />

                {/* Confirm booking */}
                <button onClick={handleConfirm} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition mt-2">
                  Confirm Booking
                </button>
              </div>
            )}

            {/* Booking success message */}
            {modalState.step === "success" && (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold mb-2 text-green-600">Booking Successful! 🎉</h3>
                <p>Your hotel has been successfully booked.</p>
                <button onClick={handleClose} className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600">Close</button>
              </div>
            )}

            {/* Booking failed message */}
            {modalState.step === "failed" && (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold mb-2 text-red-500">Booking Failed 😢</h3>
                <p>Please fill all required fields or try again.</p>
                <button onClick={handleClose} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
