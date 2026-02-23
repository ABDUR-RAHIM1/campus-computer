import React from 'react'
import DocumentImage from '../DocumentImage';
import Image from 'next/image';
import { demoProfilePicture } from '@/constans';
import DataNotFound from '../DataNotFound';
import { 
  User, Phone, BookOpen, GraduationCap, Calendar, 
  Hash, LayoutDashboard, FileText, UserCheck, ShieldAlert 
} from 'lucide-react';

export default function ProfileDetails({ status, data }) {

    if (status !== 200) {
        return <DataNotFound text={data?.message || "ডাটা পাওয়া যায়নি"} />;
    }

    const {
        isOtherStudent,
        studentName,
        studentId,
        registrationNumber,
        department,
        program,
        classYear,
        session,
        classRoll,
        contactNumber,
        institute,
        electiveSubject,
        profilePicture,
        hasImprovement,
        improvementSubjects,
        documents = [],
    } = data;

    return (
        <div className="max-w-5xl mx-auto my-10 px-4 space-y-6">
            
            {/* 🔝 Header Section: Profile Picture & Basic Info */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-50/50 border border-gray-50 flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-32 h-32">
                    <Image
                        src={profilePicture || demoProfilePicture}
                        alt="Profile"
                        fill
                        className="rounded-[2.5rem] object-cover border-4 border-blue-50 shadow-sm"
                    />
                </div>
                <div className="text-center md:text-left flex-1">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                            {studentName || studentId?.username}
                        </h1>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isOtherStudent ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {isOtherStudent ? "অন্যের প্রোফাইল" : "নিজস্ব প্রোফাইল"}
                        </span>
                    </div>
                    <p className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-bold tracking-wide">
                        <Phone size={16} /> {contactNumber || studentId?.phone || "---"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 📝 Left Column: Quick Stats */}
                <div className="space-y-6">
                    <div className="bg-gray-900 rounded-[2.5rem] p-6 shadow-xl text-white">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
                            <Hash size={16} /> একাডেমিক আইডি
                        </h3>
                        <div className="space-y-5">
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">রেজিস্ট্রেশন নম্বর</p>
                                <p className="text-lg font-black tracking-widest text-white">{registrationNumber || "---"}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">ক্লাস রোল</p>
                                <p className="text-lg font-black tracking-widest text-white">{classRoll || "---"}</p>
                            </div>
                        </div>
                    </div>

                    {/* ইম্প্রুভমেন্ট এলার্ট */}
                    {hasImprovement && (
                        <div className="bg-rose-50 rounded-[2rem] p-6 border border-rose-100">
                            <h3 className="text-[10px] font-black uppercase text-rose-600 mb-4 flex items-center gap-2">
                                <ShieldAlert size={16} /> মানোন্নয়ন বিষয়সমূহ
                            </h3>
                            <ul className="space-y-2">
                                {improvementSubjects?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-white p-2 rounded-xl shadow-sm border border-rose-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* 🏛️ Right Column: Detailed Info & Documents */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-50/50 border border-gray-50">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-8 flex items-center gap-2">
                            <LayoutDashboard size={18} /> প্রোফাইল তথ্য (Academic Info)
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "ইনস্টিটিউট", value: institute?.username, icon: <GraduationCap size={18}/> },
                                { label: "ডিপার্টমেন্ট", value: department, icon: <BookOpen size={18}/> },
                                { label: "প্রোগ্রাম", value: program, icon: <UserCheck size={18}/> },
                                { label: "সেশন", value: session, icon: <Calendar size={18}/> },
                                { label: "ক্লাস বর্ষ", value: classYear, icon: <LayoutDashboard size={18}/> },
                                { label: "ঐচ্ছিক বিষয়", value: electiveSubject, icon: <FileText size={18}/> },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                                    <div className="p-2.5 bg-white rounded-xl text-blue-500 shadow-sm border border-gray-50">{item.icon}</div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-black uppercase leading-none mb-1.5">{item.label}</p>
                                        <p className="text-sm font-bold text-gray-700">{item.value || "---"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 📎 Documents Section */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-50/50 border border-gray-50">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                            <FileText size={18} /> আপলোডকৃত ডকুমেন্টসমূহ
                        </h3>
                        
                        {documents?.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {documents.map((docUrl, index) => (
                                    <div key={index} className="rounded-2xl border-2 border-gray-50 overflow-hidden hover:border-blue-200 transition-all shadow-sm group">
                                        <DocumentImage images={docUrl} index={index} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 border-2 border-dashed border-rose-100 bg-rose-50/50 rounded-[2rem] text-center">
                                <p className="text-sm font-bold text-rose-500 uppercase tracking-tight">
                                    কোনো ডকুমেন্ট আপলোড করা হয়নি!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}