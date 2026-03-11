"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

import Logo from "@/utilities/Logo";
import AccountBtn from "./AccountBtn";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // স্ক্রল করলে শ্যাডো এবং ব্যাকগ্রাউন্ড চেঞ্জ হবে
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "হোম", href: "/" },
    // { name: "চাকরি", href: "/jobs", icon: "🔥" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled 
        ? "bg-white/80 backdrop-blur-lg shadow-xl shadow-blue-100/20 py-2" 
        : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="hover:scale-105 transition-transform">
          <Logo />
        </div>

        {/* ================= Desktop Menu ================= */}
        <div className="hidden md:flex items-center gap-2">
          {/* Main Links */}
          <div className="flex items-center gap-1 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  pathname === link.href 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                {link.icon && <span className="mr-1">{link.icon}</span>}
                {link.name}
              </Link>
            ))}

            <Link
              href="/services/college"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1 ${
                pathname === "/services/college"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              🎓 কলেজ সেবা
            </Link>
          </div>

          {/* Other Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 outline-none">
              অন্যান্য সেবা <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-gray-100 shadow-2xl">
              <DropdownMenuItem asChild className="rounded-xl focus:bg-blue-50 focus:text-blue-600 py-3 cursor-pointer">
                <Link href="/services/nu" className="font-bold">জাতীয় বিশ্ববিদ্যালয় (NU)</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl focus:bg-blue-50 focus:text-blue-600 py-3 cursor-pointer">
                <Link href="/services/education-board" className="font-bold">Education Board</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Info Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 outline-none">
              তথ্য <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-gray-100 shadow-2xl">
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold">
                <Link href="/about-us">আমাদের সম্পর্কে</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold text-blue-600">
                <Link href="/howToWork" className="flex items-center gap-2">
                  <Sparkles size={14} /> ব্যবহার নির্দেশিকা
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold">
                <Link href="/#contact">যোগাযোগ</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-6 w-[1px] bg-gray-100 mx-2"></div>
          
          <AccountBtn />
        </div>

        {/* ================= Mobile Right ================= */}
        <div className="md:hidden flex items-center gap-3">
          <AccountBtn />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-xl transition-all ${menuOpen ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700"}`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-50 shadow-2xl p-4 space-y-2 animate-in slide-in-from-top duration-300">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block p-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50"
          >
            হোম
          </Link>

          <Link
            href="/services/college"
            onClick={() => setMenuOpen(false)}
            className="block p-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100"
          >
            🎓 কলেজ সেবা
          </Link>

          <Link
            href="/jobs"
            onClick={() => setMenuOpen(false)}
            className="block p-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50"
          >
            🔥 চাকরি
          </Link>

          <div className="grid grid-cols-2 gap-2 pt-2">
             <Link href="/services/nu" className="p-3 bg-gray-50 rounded-xl text-xs font-black text-center text-gray-600">NU সেবা</Link>
             <Link href="/howToWork" className="p-3 bg-blue-50 rounded-xl text-xs font-black text-center text-blue-600">নির্দেশিকা</Link>
          </div>
        </div>
      )}
    </nav>
  );
}