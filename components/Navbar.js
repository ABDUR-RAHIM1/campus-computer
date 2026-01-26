"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";

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

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* ================= Desktop Menu ================= */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`font-medium ${
              pathname === "/" ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600`}
          >
            হোম
          </Link>

          {/* Primary Menu */}
          <Link
            href="/services/college"
            className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-1"
          >
            🎓 কলেজ সেবা
          </Link>

          <Link
            href="/jobs"
            className={`font-medium ${
              pathname === "/jobs" ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600`}
          >
            🔥 চাকরি
          </Link>

          {/* Other Services */}
          <DropdownMenu>
            <DropdownMenuTrigger className="font-medium text-gray-700 hover:text-blue-600 outline-none">
              অন্যান্য সেবা ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/services/nu">জাতীয় বিশ্ববিদ্যালয় (NU)</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/services/education-board">
                  Education Board
                </Link>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Info Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="font-medium text-gray-700 hover:text-blue-600 outline-none">
              তথ্য ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/about-us">আমাদের সম্পর্কে</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/howToWork">ব্যবহার নির্দেশিকা</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#contact">যোগাযোগ</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AccountBtn />
        </div>

        {/* ================= Mobile Right ================= */}
        <div className="md:hidden flex items-center gap-2">
          <AccountBtn />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 border rounded-md"
            aria-label="Toggle Menu"
          >
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block p-2 hover:bg-gray-50"
          >
            হোম
          </Link>

          <Link
            href="/services/college"
            onClick={() => setMenuOpen(false)}
            className="block p-2 bg-blue-50 text-blue-600 font-semibold rounded"
          >
            🎓 কলেজ সেবা
          </Link>

          <Link
            href="/jobs"
            onClick={() => setMenuOpen(false)}
            className="block p-2 hover:bg-gray-50"
          >
            🔥 চাকরি
          </Link>

          {/* Other Services */}
          <div className="border-t pt-3">
            <p className="text-sm text-gray-500 mb-2">অন্যান্য সেবা</p>
            <Link
              href="/services/nu"
              onClick={() => setMenuOpen(false)}
              className="block p-2 hover:bg-gray-50"
            >
              NU সেবা
            </Link>
            <Link
              href="/services/education-board"
              onClick={() => setMenuOpen(false)}
              className="block p-2 hover:bg-gray-50"
            >
              Education Board
            </Link>
          </div>

          {/* Info */}
          <div className="border-t pt-3">
            <p className="text-sm text-gray-500 mb-2">তথ্য</p>
            <Link
              href="/about-us"
              onClick={() => setMenuOpen(false)}
              className="block p-2 hover:bg-gray-50"
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              href="/howToWork"
              onClick={() => setMenuOpen(false)}
              className="block p-2 hover:bg-gray-50"
            >
              ব্যবহার নির্দেশিকা
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="block p-2 hover:bg-gray-50"
            >
              যোগাযোগ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
