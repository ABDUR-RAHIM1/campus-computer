"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserPlus, Eye, FileEdit, ChevronDown, GraduationCap, Briefcase } from 'lucide-react';

export default function ProfileActions({ studentRegistration }) {
    const [createDropdown, setCreateDropdown] = useState(false);
    const [viewDropdown, setViewDropdown] = useState(false);

    return (
        <div className="my-6 max-w-md mx-auto space-y-3 px-2">
            
            {/* First Row: 2 Buttons */}
            <div className="grid grid-cols-2 gap-3">
                {/* Create Profile */}
                <div className="relative">
                    <button
                        onClick={() => setCreateDropdown(!createDropdown)}
                        className="w-full flex items-center justify-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-tighter bg-blue-600 text-white py-4 px-2 rounded-2xl shadow-md active:scale-95 transition-all"
                    >
                        <UserPlus size={16} /> প্রোফাইল তৈরি <ChevronDown size={14} className={createDropdown ? 'rotate-180' : ''} />
                    </button>
                    
                    {createDropdown && (
                        <div className="absolute left-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 z-[60] p-1 animate-in zoom-in duration-150">
                            <Link href="/profile/actions/college" className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 rounded-xl text-xs font-bold text-gray-700">
                                <GraduationCap size={16} className="text-blue-600" /> কলেজ প্রোফাইল
                            </Link>
                            <Link href="/profile/actions/job" className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 rounded-xl text-xs font-bold text-gray-700">
                                <Briefcase size={16} className="text-indigo-600" /> জব প্রোফাইল
                            </Link>
                        </div>
                    )}
                </div>

                {/* View Profile */}
                <div className="relative">
                    <button
                        onClick={() => setViewDropdown(!viewDropdown)}
                        className="w-full flex items-center justify-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-tighter bg-white border-2 border-blue-600 text-blue-600 py-[14px] px-2 rounded-2xl active:scale-95 transition-all"
                    >
                        <Eye size={16} /> দেখুন <ChevronDown size={14} className={viewDropdown ? 'rotate-180' : ''} />
                    </button>
                    
                    {viewDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 z-[60] p-1 animate-in zoom-in duration-150">
                            <Link href="/profile/profile-list/college" className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 rounded-xl text-xs font-bold text-gray-700">
                                <GraduationCap size={16} className="text-blue-600" /> কলেজ লিস্ট
                            </Link>
                            <Link href="/profile/profile-list/job" className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 rounded-xl text-xs font-bold text-gray-700">
                                <Briefcase size={16} className="text-indigo-600" /> জব লিস্ট
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Second Row: 1 Button (Full Width) */}
            <Button asChild
                className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-black uppercase tracking-widest text-xs py-7 rounded-2xl shadow-lg shadow-pink-100 border-none"
            >
                <Link href={{ pathname: "/profile/form_fill_up", query: { reg: studentRegistration } }}>
                    <FileEdit size={18} className="mr-2" /> ফরম ফিলাপ করুন
                </Link>
            </Button>

        </div>
    );
}