"use client";

import { useState } from "react";
import { FaPlane, FaHotel, FaDollarSign, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/flights", label: "Flights", icon: <FaPlane /> },
    { href: "/hotels", label: "Hotels", icon: <FaHotel /> },
    { href: "/offers", label: "Offers", icon: <FaDollarSign /> },
    { href: "/contact", label: "Contact", icon: <IoMdContact /> },
  ];

  return (
    <header className="fixed w-full z-50 bg-black/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center gap-2 cursor-pointer">
            <FaPlane /> TravelMate <MdOutlineTravelExplore className="text-white" />
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-semibold text-gray-200">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-400 transition flex items-center gap-1">
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-200 text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md absolute w-full top-20 left-0 flex flex-col  py-6 space-y-6 font-semibold text-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex ml-5 items-center gap-2 text-lg hover:text-blue-400 transition"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
