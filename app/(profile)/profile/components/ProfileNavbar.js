"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, UserCircle } from 'lucide-react';
import Logo from '@/utilities/Logo';

export default function ProfileNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'ওভারভিউ', href: '/profile' },
    { name: 'অর্ডারসমূহ', href: '/profile/orders' },
    { name: 'পেমেন্ট', href: '/profile/payments' },
    { name: "🔥 চাকরি বিজ্ঞপ্তি", href: "/profile/jobs" },
    { name: 'মেসেজ', href: '/profile/messages' },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* 1. Logo Section */}
          <div className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
            <Logo />
          </div>

          {/* 2. Desktop Navigation (Curved Style) */}
          <nav className="hidden md:flex items-center bg-gray-50/50 p-1.5 rounded-[1.5rem] border border-gray-100">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-[1.2rem] ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-white'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. Action Buttons (Right) */}
          <div className="flex items-center gap-3">
            {/* Notification - ছোট্ট একটি ডটসহ */}
            <button className="relative p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2.5 rounded-xl transition-all ${menuOpen ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'
                  }`}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* User Profile Avatar (Desktop) */}
            <div className="hidden md:block w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 p-0.5 overflow-hidden">
              <div className="w-full h-full bg-white rounded-[0.8rem] flex items-center justify-center text-blue-600">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Animated Overlay Style) */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 bg-gray-50/50 hover:bg-gray-100'
                  }`}
              >
                {item.name}
                {isActive && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}