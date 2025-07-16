"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProfileNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'প্রোফাইল ওভারভিউ', href: '/profile' },
    { name: 'অনার্স আবেদন', href: '/profile/honours' },
    { name: 'ডিগ্রী আবেদন', href: '/profile/degree' },
    { name: 'ইন্টারমিডিয়েট আবেদন', href: '/profile/intermediate' },
    { name: 'অর্ডারসমূহ', href: '/profile/orders' },
  ];

return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-gray-800">Campus Computer</span>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 cursor-pointer border rounded-md">
            {/* <Menu className="h-6 w-6 text-gray-700" />
             */}
              Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block w-full text-sm font-medium px-4 py-2 rounded ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
