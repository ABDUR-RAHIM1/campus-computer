"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, LogOut } from 'lucide-react'; 
import Logo from '@/utilities/Logo';
import { logoutStudent } from '@/getToken';
import { globalContext } from '@/contextApi/ContextApi';

export default function ProfileNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { showToast } = useContext(globalContext);

  const navItems = [
    { name: 'ওভারভিউ', href: '/profile' },
    { name: 'আবেদন সমূহ', href: '/profile/orders' },
    { name: 'পেমেন্ট সমূহ', href: '/profile/payments' },
    { name: "🔥 চাকরি বিজ্ঞপ্তি", href: "/profile/jobs" },
  ];

  const handleLogOut = async () => {
    const permission = confirm("আপনি কি লগ আউট করতে চান?");
    if (permission) {
      await logoutStudent();
      showToast(200, "লগ আউট করা হয়েছে।");
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* 1. Logo Section */}
          <div className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
            <Logo />
          </div>

          {/* 2. Desktop Navigation */}
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
          <div className="flex items-center gap-2">
            {/* Notification */}
            <button className="relative p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            {/* Logout Button - Desktop View (Redesigned) */}
            <button 
              onClick={handleLogOut}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all font-bold text-xs uppercase tracking-tighter"
            >
              <LogOut size={16} />
              লগআউট
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2.5 rounded-xl transition-all ${menuOpen ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-[600px] opacity-100 py-2 shadow-2xl' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between w-full px-5 py-2 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 bg-gray-50/50 hover:bg-gray-100'
                  }`}
              >
                {item.name}
                {isActive && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
              </Link>
            );
          })}
          
          {/* Logout Button - Mobile Menu Bottom */}
          <button 
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-5 py-2 rounded-2xl text-sm font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-100 mt-4 active:scale-95 transition-all cursor-pointer"
          >
            <LogOut size={20} />
            লগআউট করুন
          </button>
        </div>
      </div>
    </header>
  );
}