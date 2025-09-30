"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlaneDeparture,
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

import { GiCommercialAirplane } from "react-icons/gi";
import { GiTicket } from "react-icons/gi";

type Country = { code: string; name: string; img: string; };
type Flight = {
  id: string; 
  airline: string;
  from: Country;
  to: Country;
  depart: string;
  arrive: string;
  duration: string;
  date: string;
  price: string;
  rating: string;
};

const countries: Country[] = [
  { code: "FR", name: "France", img: "https://flagcdn.com/w20/fr.png" },
  { code: "US", name: "United States", img: "https://flagcdn.com/w20/us.png" },
  { code: "AE", name: "UAE", img: "https://flagcdn.com/w20/ae.png" },
  { code: "TR", name: "Turkey", img: "https://flagcdn.com/w20/tr.png" },
  { code: "DE", name: "Germany", img: "https://flagcdn.com/w20/de.png" },
  { code: "GB", name: "United Kingdom", img: "https://flagcdn.com/w20/gb.png" },
  { code: "IT", name: "Italy", img: "https://flagcdn.com/w20/it.png" },
  { code: "ES", name: "Spain", img: "https://flagcdn.com/w20/es.png" },
  { code: "JP", name: "Japan", img: "https://flagcdn.com/w20/jp.png" },
  { code: "CN", name: "China", img: "https://flagcdn.com/w20/cn.png" },
  { code: "IN", name: "India", img: "https://flagcdn.com/w20/in.png" },
  { code: "BR", name: "Brazil", img: "https://flagcdn.com/w20/br.png" },
  { code: "CA", name: "Canada", img: "https://flagcdn.com/w20/ca.png" },
  { code: "AU", name: "Australia", img: "https://flagcdn.com/w20/au.png" },
];

const generateFlights = (from: Country, to: Country, date: string): Flight[] => {
  const airlines = ["Air France", "Emirates", "Turkish Airlines", "Lufthansa", "British Airways"];
  return Array.from({ length: 3 }).map(() => {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const departHour = Math.floor(Math.random() * 12) + 1;
    const arriveHour = departHour + Math.floor(Math.random() * 6) + 1;
    const id = `${airline}-${from.code}-${to.code}-${departHour}-${arriveHour}-${date}`;
    return {
      id,
      airline,
      from,
      to,
      depart: `${departHour}:00 ${departHour < 12 ? "AM" : "PM"}`,
      arrive: `${arriveHour}:00 ${arriveHour < 12 ? "AM" : "PM"}`,
      duration: `${arriveHour - departHour}h`,
      date: date || new Date().toLocaleDateString(),
      price: `$${Math.floor(Math.random() * 400) + 200}`,
      rating: (Math.random() * 1 + 4).toFixed(1),
    };
  });
};

export default function FlightsPage() {
  const [from, setFrom] = useState<Country>(countries[0]);
  const [to, setTo] = useState<Country>(countries[1]);
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [showDropdownFrom, setShowDropdownFrom] = useState(false);
  const [showDropdownTo, setShowDropdownTo] = useState(false);
  const [modalState, setModalState] = useState<{
    show: boolean;
    flight?: Flight;
    step?: "invalid" | "form" | "success" | "failed";
  }>({ show: false });
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [soldFlights, setSoldFlights] = useState<string[]>([]); // لیست ID بلیط‌های رزرو شده

  // Load In LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("soldFlights");
    if (stored) setSoldFlights(JSON.parse(stored));
  }, []);

  const handleSearch = () => {
    if (from.code === to.code) {
      setModalState({ show: true, step: "invalid" });
      return;
    }
    setFlights(generateFlights(from, to, date));
  };

  const handleBook = (flight: Flight) => {
    if (soldFlights.includes(flight.id)) return; 
    setModalState({ show: true, flight, step: "form" });
    setUserInfo({ name: "", email: "", phone: "" });
  };

  const handleClose = () => setModalState({ show: false });

  const handlePayment = () => {
    const { name, email, phone } = userInfo;
    if (!name || !email || !phone) {
      setModalState((prev) => prev.flight ? { ...prev, step: "failed" } : prev);
      return;
    }
    if (modalState.flight) {
      const newSold = [...soldFlights, modalState.flight.id];
      setSoldFlights(newSold);
      localStorage.setItem("soldFlights", JSON.stringify(newSold));
      setModalState({ ...modalState, step: "success" });
    }
  };

  return (
    <div className="min-h-screen  text-black bg-white py-16 px-6 md:px-20">
      {/* Search */}
      <section className="mb-12 mt-30 text-center">
        <h1 className="text-4xl flex justify-center md:text-5xl font-extrabold mb-4 text-gray-900">
            Find Your Flight 
            <GiCommercialAirplane className="mt-2 ml-1" />
            <GiTicket className="mt-2 ml-1" />

        </h1>
        <p className="text-gray-600 mb-8">Select your origin and destination, and get instant flights!</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-5xl mx-auto items-center">
          {/* From */}
          <div className="relative w-full md:w-1/5">
            <div onClick={() => setShowDropdownFrom(!showDropdownFrom)} className="flex items-center justify-between px-3 py-3 rounded-xl border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-400 transition">
              <div className="flex items-center gap-2">
                <Image src={from.img} alt={from.name} width={20} height={20} className="rounded-full" />
                {from.name}
              </div>
              <span className="text-gray-500">▼</span>
            </div>
            {showDropdownFrom && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl z-50 max-h-60 overflow-y-auto border border-gray-200">
                {countries.map(c => (
                  <div key={c.code} onClick={() => { setFrom(c); setShowDropdownFrom(false); }} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100">
                    <Image src={c.img} alt={c.name} width={20} height={20} className="rounded-full" />
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* To */}
          <div className="relative w-full md:w-1/5">
            <div onClick={() => setShowDropdownTo(!showDropdownTo)} className="flex items-center justify-between px-3 py-3 rounded-xl border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-400 transition">
              <div className="flex items-center gap-2">
                <Image src={to.img} alt={to.name} width={20} height={20} className="rounded-full" />
                {to.name}
              </div>
              <span className="text-gray-500">▼</span>
            </div>
            {showDropdownTo && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl z-50 max-h-60 overflow-y-auto border border-gray-200">
                {countries.map(c => (
                  <div key={c.code} onClick={() => { setTo(c); setShowDropdownTo(false); }} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100">
                    <Image src={c.img} alt={c.name} width={20} height={20} className="rounded-full" />
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date */}
          <div className="relative w-full md:w-1/5">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="pl-3 w-full py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <button onClick={handleSearch} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transform transition hover:scale-105">
            <FaPlaneDeparture /> Search
          </button>
        </div>
      </section>

      {/* Flights List */}
      {flights.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {flights.map((f) => {
            const sold = soldFlights.includes(f.id);
            return (
              <motion.div key={f.id} whileHover={{ scale: 1.05, translateY: -5 }} className={`bg-white rounded-3xl shadow-lg p-6 transform transition hover:shadow-2xl ${sold ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{f.airline}</h3>
                <div className="flex justify-between items-center mb-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Image src={f.from.img} alt={f.from.name} width={20} height={20} className="rounded-full" />
                    <span className="font-semibold">{f.from.name}</span> →
                    <Image src={f.to.img} alt={f.to.name} width={20} height={20} className="rounded-full" />
                    <span className="font-semibold">{f.to.name}</span>
                  </div>
                  <div className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {f.rating}</div>
                </div>
                <div className="flex justify-between items-center mb-2 text-gray-500">
                  <div className="flex items-center gap-1"><FaClock /> {f.duration}</div>
                  <div className="flex items-center gap-1"><FaCalendarAlt /> {f.date}</div>
                </div>
                <div className="font-semibold text-lg text-gray-900 mb-4">{f.price}</div>
                <button onClick={() => handleBook(f)} disabled={sold} className={`w-full py-2 rounded-xl font-semibold transform transition hover:scale-105 ${sold ? "bg-gray-400 text-white" : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white"}`}>
                  {sold ? "Sold Out" : "Book Now"}
                </button>
              </motion.div>
            );
          })}
        </section>
      )}

      {/* Modal */}
      {modalState.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><FaTimes /></button>

            {modalState.step === "invalid" && (
              <div className="text-center">
                <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Invalid Selection</h3>
                <p>Origin and Destination cannot be the same.</p>
              </div>
            )}

            {modalState.step === "form" && modalState.flight && (
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold mb-4 text-center">Booking Details - {modalState.flight.airline}</h3>

                {/* Flight Info */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2"><Image src={modalState.flight.from.img} alt={modalState.flight.from.name} width={24} height={24} className="rounded-full" /> {modalState.flight.from.name}</div>
                  <div className="flex items-center gap-2"><Image src={modalState.flight.to.img} alt={modalState.flight.to.name} width={24} height={24} className="rounded-full" /> {modalState.flight.to.name}</div>
                  <div className="flex items-center gap-2"><FaClock /> Duration: {modalState.flight.duration}</div>
                  <div className="flex items-center gap-2"><FaCalendarAlt /> Date: {modalState.flight.date}</div>
                  <div className="flex items-center gap-2"><FaStar className="text-yellow-400" /> Rating: {modalState.flight.rating}</div>
                  <div className="font-semibold text-lg">Price: {modalState.flight.price}</div>
                </div>

                {/* User Info */}
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Full Name" className="border px-3 py-2 rounded-xl" value={userInfo.name} onChange={e => setUserInfo({...userInfo, name:e.target.value})} />
                  <input type="email" placeholder="Email" className="border px-3 py-2 rounded-xl" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email:e.target.value})} />
                  <input type="tel" placeholder="Phone Number" className="border px-3 py-2 rounded-xl" value={userInfo.phone} onChange={e => setUserInfo({...userInfo, phone:e.target.value})} />
                </div>

                <button onClick={handlePayment} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition mt-2">
                  Confirm Booking
                </button>
              </div>
            )}

            {modalState.step === "success" && (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold mb-2 text-green-600">Booking Successful! 🎉</h3>
                <p>Your flight has been successfully booked.</p>
                <button onClick={handleClose} className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600">Close</button>
              </div>
            )}

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
