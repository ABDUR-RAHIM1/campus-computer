"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon } from 'lucide-react';
import { dashboardNavItems } from '@/LocalDatabase/DashbboardNavItems';

export default function DashboardNavbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);




    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                    <p>Campus Computer</p>
                </div>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex space-x-3">
                    {dashboardNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded ${pathname === item.href
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
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 cursor-pointer border rounded-md"
                        aria-label="Toggle Menu"
                    >
                        <MenuIcon className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 animate-fade-in">
                    {dashboardNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block w-full text-sm font-medium px-4 py-2 rounded ${pathname === item.href
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
