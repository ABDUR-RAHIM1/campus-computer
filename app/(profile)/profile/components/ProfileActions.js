"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function ProfileActions() {
    const [createDropdown, setCreateDropdown] = useState(false);
    const [viewDropdown, setViewDropdown] = useState(false);

    return (
        <div className="my-3 flex items-center justify-between flex-wrap gap-2">

            {/* Create Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setCreateDropdown(!createDropdown)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                >
                    প্রোফাইল তৈরি করুন
                </button>
                {createDropdown && (
                    <div className="absolute mt-2 w-40 bg-white shadow-lg rounded border z-10">
                        <Link href="/profile/actions/college" className="block px-4 py-2 hover:bg-blue-100">
                            কলেজ প্রোফাইল
                        </Link>
                        <Link href="/profile/actions/job" className="block px-4 py-2 hover:bg-blue-100">
                            জব প্রোফাইল
                        </Link>
                    </div>
                )}
            </div>

            {/* View Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setViewDropdown(!viewDropdown)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                >
                    প্রোফাইল দেখুন
                </button>
                {viewDropdown && (
                    <div className="absolute mt-2 w-40 bg-white shadow-lg rounded border z-10">
                        <Link href="/profile/profile-list/college" className="block px-4 py-2 hover:bg-blue-100">
                            কলেজ প্রোফাইল
                        </Link>
                        <Link href="/profile/profile-list/job" className="block px-4 py-2 hover:bg-blue-100">
                            জব প্রোফাইল
                        </Link>
                    </div>
                )}
            </div>

        </div>
    );
}
