import React from "react";
import Image from "next/image";
import Services from "./components/Services";
import { demoProfilePicture } from "@/constans";
import { getMyProfile } from "@/handlers/profile";
import { getMyProfileInfo } from "@/handlers/studentAuth";
import ServicesInfo from "@/components/ServicesInfo";
import ProfileActions from "./components/ProfileActions";
import { User, Phone, BookOpen, GraduationCap, Calendar, Hash, AlertCircle, CheckCircle2 } from "lucide-react";

export default async function StudentProfile() {
    // ১. ডাটা ফেচিং
    const [authAccount, profileAccount] = await Promise.all([
        getMyProfileInfo(),
        getMyProfile()
    ]);

    const { status: authStatus, data: authData } = authAccount;
    const { status: profileStatus, data: profileData } = profileAccount;

    // ২. প্রোফাইল আছে কি না তা চেক করা (Mismatch Fix)
    const hasProfile = profileStatus === 200 && profileData;
    const studentProfile = hasProfile ? profileData : {}; // না থাকলে এম্পটি অবজেক্ট
    
    const { username, phone } = authData || {};

    const requiredFields = [
        "registrationNumber",
        "classYear",
        "department",
        "session",
    ];

    // প্রোফাইল না থাকলে এটি অটোমেটিক false হবে
    const isProfileComplete = hasProfile && requiredFields.every(
        (field) => {
            const value = studentProfile[field];
            return value !== undefined && value !== null && value.toString().trim() !== "";
        }
    );

    const getClassYearInBangla = (year) => {
        if(!year) return "__";
        const yearMap = { 1: "প্রথম বর্ষ", 2: "দ্বিতীয় বর্ষ", 3: "তৃতীয় বর্ষ", 4: "চতুর্থ বর্ষ" };
        return yearMap[year] || "__";
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 items-start gap-8">
                
                {/* 🎨 Left Sidebar - Profile Summary */}
                <div className="space-y-6">
                    <div className="bg-white shadow-xl shadow-blue-100/50 rounded-[2.5rem] p-8 border border-blue-500 relative overflow-hidden">
                        
                        {/* প্রোফাইল পিকচার সেকশন */}
                        <div className="relative mb-6">
                            <div className="w-36 h-36 mx-auto rounded-[2rem] p-1.5 bg-gradient-to-tr from-blue-100 to-gray-100 shadow-inner">
                                <Image
                                    src={studentProfile?.profilePicture || demoProfilePicture}
                                    alt="Student"
                                    width={140}
                                    height={140}
                                    className={`w-full h-full rounded-[1.7rem] object-cover bg-white ${!hasProfile ? 'opacity-50 grascale' : ''}`}
                                />
                            </div>
                            {isProfileComplete && (
                                <div className="absolute bottom-1 right-1/4 bg-emerald-500 text-white p-1 rounded-full border-4 border-white shadow-lg">
                                    <CheckCircle2 size={14} />
                                </div>
                            )}
                        </div>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase">
                                {username || "নতুন শিক্ষার্থী"}
                            </h2>
                            <p className="flex items-center justify-center gap-2 text-gray-500 font-bold text-sm mt-1">
                                <Phone size={14} className="text-blue-500" /> {phone || "--"}
                            </p>
                        </div>

                        {/* একশন বাটনগুলো (প্রোফাইল না থাকলেও ইউজার এখানে কাজ করতে পারবে) */}
                        <div className="mb-8 border-y border-gray-50 py-4">
                            <ProfileActions 
                                studentRegistration={studentProfile?.registrationNumber || ""} 
                            />
                        </div>

                        {/* গুরুত্বপূর্ণ তথ্যসমূহ */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 mb-4">
                                <BookOpen size={16} /> প্রোফাইল তথ্য
                            </h3>
                            
                            {!hasProfile ? (
                                <div className="p-4 bg-blue-50 rounded-2xl border border-dashed border-blue-200 text-center">
                                    <p className="text-[11px] text-blue-700 font-bold leading-relaxed">
                                        আপনি এখনো কোনো প্রোফাইল তৈরি করেননি। সেবা নিতে উপরের বাটন থেকে প্রোফাইল তৈরি করুন।
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { label: "শিক্ষা প্রতিষ্ঠান", value: studentProfile?.institute?.username, icon: <GraduationCap size={16}/> },
                                        { label: "স্টুডেন্ট আইডি", value: studentProfile.registrationNumber, icon: <Hash size={16}/> },
                                        { label: "বিভাগ", value: studentProfile.department, icon: <BookOpen size={16}/> },
                                        { label: "সেশন", value: studentProfile.session, icon: <Calendar size={16}/> },
                                        { label: "ক্লাস", value: getClassYearInBangla(studentProfile.classYear), icon: <User size={16}/> },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                                            <div className="p-2 bg-white rounded-xl text-blue-500 shadow-sm">{item.icon}</div>
                                            <div>
                                                <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5">{item.label}</p>
                                                <p className="text-sm font-bold text-gray-700">{item.value || "__"}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ইনকমপ্লিট ওয়ার্নিং */}
                        {hasProfile && !isProfileComplete && (
                            <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-3">
                                <AlertCircle className="text-orange-500 shrink-0" size={18} />
                                <p className="text-[10px] text-orange-700 font-bold">
                                    আপনার তথ্য অসম্পূর্ণ! সকল সার্ভিস পেতে প্রোফাইল আপডেট করুন।
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - Main Content (সার্ভিসগুলো সবসময় ভিজিবল থাকবে) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow-xl shadow-blue-100/50 rounded-[2.5rem] p-3 md:p-8 border border-gray-50">
                        <div className="mb-6">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-2">
                                হ্যালো, {username || "শিক্ষার্থী"}! <span className="animate-bounce">👋</span>
                            </h3>
                        </div>
                        
                        <ServicesInfo />
                        <div className="mt-8">
                            <Services />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}