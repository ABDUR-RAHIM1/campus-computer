"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



export default function ProfileActions({ studentRegistration }) {
    const [createDropdown, setCreateDropdown] = useState(false);
    const [viewDropdown, setViewDropdown] = useState(false);

    return (
        <div className="my-3 flex items-center justify-center flex-wrap gap-2">

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

            <div className='my-0 md:my-5'>
                <Button asChild
                    className={" bg-pink-600"}
                    title={"জাতীয় বিশ্ববিদ্যালয়য়ের ফরম পুরন করুন"}
                >
                    <Link href={
                        {
                            pathname: "/profile/form_fill_up",
                            query: { reg: studentRegistration }
                        }
                    }>
                        ফরম ফিলাপ করুন
                    </Link>
                </Button>
            </div>

        </div>
    );
}
