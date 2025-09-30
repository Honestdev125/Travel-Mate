"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlaneDeparture,
  FaHotel,
  FaStar,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import Image from "next/image";

export default function UltimateDashboard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [filterRating] = useState(0);

  const offers = [
    {
      city: "Paris",
      price: "$299",
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    },
    {
      city: "Dubai",
      price: "$399",
      rating: 4.6,
      img: "https://aaochalo.com/wp-content/uploads/2025/06/stopover-in-dubai_dubai-by-night.jpg",
    },
    {
      city: "Istanbul",
      price: "$199",
      rating: 4.7,
      img: "https://www.midtown-hotel.com/wp-content/uploads/2018/09/Emino%CC%88nu%CC%88.jpg",
    },
  ];

  const stats = [
    { icon: <FaPlaneDeparture />, label: "Flights Booked", value: 2000 },
    { icon: <FaHotel />, label: "Hotels", value: 500 },
    { icon: <FaUsers />, label: "Happy Customers", value: 1200 },
  ];

  const testimonials = [
    {
      name: "Alice",
      city: "London",
      avatar: "https://cdn.pixabay.com/photo/2020/09/10/11/30/girl-5560212_640.jpg",
      text: "TravelMate made my trip seamless and fun!",
    },
    {
      name: "Bob",
      city: "New York",
      avatar: "https://img.freepik.com/free-photo/medium-shot-contemplative-man-seaside_23-2150531590.jpg?semt=ais_hybrid&w=740&q=80",
      text: "Amazing experience, highly recommend!",
    },
    {
      name: "Clara",
      city: "Paris",
      avatar: "https://play-lh.googleusercontent.com/_qUtBpMVsGY-CLPx2DreAENHAbr4KHwBGn2w_3jhGSzoRVFRKn0SXUaK0wXSU0SJ7A",
      text: "Fast booking, great deals, love it!",
    },
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Filtered offers
  const filteredOffers = offers.filter((o) => o.rating >= filterRating);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 0.5, 0] }}
          transition={{ duration: 30, repeat: Infinity }}
          style={{
            backgroundImage:
              "url('https://wallpapers.com/images/hd/travel-hd-axhrsecphqby11wk.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white">
            Travel The World Like Never Before 
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Book Flights & Hotels Instantly with Style & Ease
          </p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white text-black rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto"
          >
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full md:w-1/4 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full md:w-1/4 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full md:w-1/4 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-semibold transition-transform transform hover:scale-105">
              <FaSearch /> Search
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Offers */}
      <section className="py-20 bg-gray-50 text-black text-center relative">
        <h3 className="text-3xl font-bold mb-6">🔥 Trending Destinations</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-20">
          {filteredOffers.map((offer, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg rounded-3xl overflow-hidden cursor-pointer transform transition-transform duration-300"
            >
              <Image
                width={1000}
                height={1000}
                src={offer.img}
                alt={offer.city}
                className="w-full h-64 md:h-72 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">{offer.city}</h4>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaStar className="text-yellow-400" /> {offer.rating}
                </div>
                <p className="text-gray-600 mb-2">
                  Starting from {offer.price}
                </p>
                <p className="text-gray-500 mb-4">Availability: Limited</p>
                <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-xl hover:scale-105 transform transition">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white text-black text-center">
        <h3 className="text-3xl font-bold mb-12">Our Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
              className="flex flex-col items-center bg-gray-100 p-8 rounded-2xl shadow-lg"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h4 className="text-xl font-bold">{stat.value}+</h4>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100 text-black text-center">
        <h3 className="text-3xl font-bold mb-12">What Our Customers Say</h3>
        <motion.div
          key={testimonialIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center"
        >
          <Image
            width={1000}
            height={1000}
            src={testimonials[testimonialIndex].avatar}
            alt={testimonials[testimonialIndex].name}
            className="w-20 h-20 rounded-full mb-4"
          />
          <h4 className="text-xl font-bold">
            {testimonials[testimonialIndex].name},{" "}
            {testimonials[testimonialIndex].city}
          </h4>
          <p className="mt-2 text-gray-600 italic">
            {testimonials[testimonialIndex].text}
          </p>
        </motion.div>
      </section>

      
    </div>
  );
}
