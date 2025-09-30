"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaBed, FaCalendarAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { RiHotelFill } from "react-icons/ri";

type Country = { code: string; name: string; img: string };
type Hotel = {
  id: string;
  name: string;
  city: string;
  countryCode: string;
  img: string;
  rating: number;
  price: number;
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

const generateHotels = (countryCode: string): Hotel[] => {
  const names = ["Hilton", "Marriott", "Sheraton", "Ritz", "Four Seasons"];
  const cities: Record<string, string[]> = {
    FR: ["Paris", "Nice", "Lyon"],
    US: ["New York", "Los Angeles", "Chicago"],
    AE: ["Dubai", "Abu Dhabi"],
    TR: ["Istanbul", "Antalya"],
    DE: ["Berlin", "Munich", "Hamburg"],
    GB: ["London", "Manchester", "Liverpool"],
    IT: ["Rome", "Milan", "Venice"],
    ES: ["Madrid", "Barcelona", "Seville"],
    JP: ["Tokyo", "Kyoto", "Osaka"],
    CN: ["Beijing", "Shanghai", "Guangzhou"],
    IN: ["Mumbai", "Delhi", "Bangalore"],
    BR: ["Rio de Janeiro", "Sao Paulo", "Brasilia"],
    CA: ["Toronto", "Vancouver", "Montreal"],
    AU: ["Sydney", "Melbourne", "Brisbane"],
  };

  return Array.from({ length: 3 }).map((_, i) => {
    const city = cities[countryCode][i % cities[countryCode].length];
    const name = `${names[i % names.length]} ${city}`;
    const hotelImages = [
      "https://www.harbourhotels.co.uk/media/d4ipp450/1c57cb2a162815dd23ef3db35d0e8521.jpg",
      "https://www.hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg",
      "https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720?fit=crop,1&wid=1440&hei=720",
      "https://toohotel.com/wp-content/uploads/2022/09/TOO_Hotel_Suite_Bathroom_Panoramique.jpg",
    ];

    return {
      id: `${countryCode}-${i}-${Date.now()}`,
      name,
      city,
      countryCode,
      img: hotelImages[i % hotelImages.length],
      rating: +(Math.random() * 1 + 4).toFixed(1),
      price: Math.floor(Math.random() * 400) + 150,
    };
  });
};

export default function HotelsPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookedHotels, setBookedHotels] = useState<string[]>([]);
  const [modalState, setModalState] = useState<{
    show: boolean;
    hotel?: Hotel;
    step?: "form" | "success" | "failed";
  }>({ show: false });
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const saved = localStorage.getItem("bookedHotels");
    if (saved) setBookedHotels(JSON.parse(saved));
  }, []);

  const handleSearch = () => {
    if (!checkIn || !checkOut) return;
    setHotels(generateHotels(selectedCountry.code));
  };

  const handleBook = (hotel: Hotel) => {
    if (bookedHotels.includes(hotel.id)) return;
    setModalState({ show: true, hotel, step: "form" });
    setUserInfo({ name: "", email: "", phone: "" });
  };

  const handleClose = () => setModalState({ show: false });

  const handleConfirmBooking = () => {
    const { name, email, phone } = userInfo;
    if (!name || !email || !phone) {
      setModalState((prev) =>
        prev.hotel ? { ...prev, step: "failed" } : prev
      );
      return;
    }
    if (modalState.hotel) {
      const updated = [...bookedHotels, modalState.hotel.id];
      setBookedHotels(updated);
      localStorage.setItem("bookedHotels", JSON.stringify(updated));
      setModalState((prev) =>
        prev.hotel ? { ...prev, step: "success" } : prev
      );
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-20 text-black">
      <h1 className="text-4xl flex justify-center mt-30 md:text-5xl font-extrabold text-center mb-8">
        Find Your Hotel
        <RiHotelFill />
      </h1>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-center max-w-5xl mx-auto items-center mb-12">
        <div className="relative w-full md:w-1/4">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-between px-3 py-3 rounded-xl border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
          >
            <div className="flex items-center gap-2">
              <Image
                src={selectedCountry.img}
                alt={selectedCountry.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              {selectedCountry.name}
            </div>
            <span className="text-gray-500">▼</span>
          </div>
          {showDropdown && (
            <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl z-50 max-h-60 overflow-y-auto border border-gray-200">
              {countries.map((c) => (
                <div
                  key={c.code}
                  onClick={() => {
                    setSelectedCountry(c);
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <Image
                    src={c.img}
                    alt={c.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="px-3 py-3 border border-gray-300 rounded-xl w-full md:w-1/4 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="px-3 py-3 border border-gray-300 rounded-xl w-full md:w-1/4 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transform transition w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {/* Hotels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hotels.map((h) => {
          const isBooked = bookedHotels.includes(h.id);
          return (
            <motion.div
              key={h.id}
              whileHover={{ scale: 1.03 }}
              className={`relative bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transform transition hover:shadow-2xl ${
                isBooked ? "opacity-50" : ""
              }`}
              onClick={() => handleBook(h)}
            >
              <Image
                src={h.img}
                alt={h.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">{h.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaStar className="text-yellow-400" /> {h.rating}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaBed /> {h.city}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaCalendarAlt />{" "}
                  {checkIn && checkOut
                    ? `${checkIn} - ${checkOut}`
                    : "Select dates"}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  ${h.price} / night
                </div>
              </div>
              {isBooked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
                  SOLD OUT
                </div>
              )}
            </motion.div>
          );
        })}
      </section>

      {/* Modal */}
      {modalState.show && modalState.hotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <FaTimes />
            </button>

            {modalState.step === "form" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {modalState.hotel.name} - Booking
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <div>City: {modalState.hotel.city}</div>
                  <div>Price: ${modalState.hotel.price} / night</div>
                  <div>Rating: {modalState.hotel.rating}</div>
                  <div>
                    Dates: {checkIn} - {checkOut}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="border px-3 py-2 rounded-xl"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border px-3 py-2 rounded-xl"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="border px-3 py-2 rounded-xl"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition mt-2"
                >
                  Confirm Booking
                </button>
              </div>
            )}

            {modalState.step === "success" && (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold mb-2 text-green-600">
                  Booking Successful! 🎉
                </h3>
                <p>Your hotel has been successfully booked.</p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            )}

            {modalState.step === "failed" && (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold mb-2 text-red-500">
                  Booking Failed 😢
                </h3>
                <p>Please fill all required fields and try again.</p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
