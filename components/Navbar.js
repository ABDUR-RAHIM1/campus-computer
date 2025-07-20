"use client";
import React, { useState } from "react";
import Link from "next/link";
import AccountBtn from "./AccountBtn";
import { Menu as MenuIcon } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo & Name */}
                <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-gray-800">Campus Computer</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                        হোম
                    </Link>
                    <Link href="#services-list" className="text-gray-700 hover:text-blue-600 font-medium">
                        সেবা সমূহ
                    </Link>
                    <Link href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                        যোগাযোগ
                    </Link>
                    <AccountBtn />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="p-2 text-3xl cursor-pointer border rounded-md "
                        aria-label="Toggle Menu"
                    >
                        <MenuIcon className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2">
                    <Link
                        href="/"
                        className="block text-gray-700 hover:text-blue-600 font-medium"
                        onClick={handleClose}
                    >
                        হোম
                    </Link>
                    <Link
                        href="#services-list"
                        className="block text-gray-700 hover:text-blue-600 font-medium"
                        onClick={handleClose}
                    >
                        সেবা সমূহ
                    </Link>
                    <Link
                        href="#contact"
                        className="block text-gray-700 hover:text-blue-600 font-medium"
                        onClick={handleClose}
                    >
                        যোগাযোগ
                    </Link>
                    <div onClick={handleClose}>
                        <AccountBtn />
                    </div>
                </div>
            )}
        </nav>
    );
}
