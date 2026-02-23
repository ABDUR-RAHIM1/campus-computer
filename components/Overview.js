import React from "react";
import { CheckCircle2, BookOpen, GraduationCap, Trophy } from "lucide-react";

const serviceStats = [
    {
        level: "Intermediate",
        completed: 124,
        description: "এইচএসসি স্তরের ফর্ম ফিলাপ, রেজিস্ট্রেশন ও সনদ উত্তোলনের সফল সমাধান।",
        icon: <BookOpen className="w-8 h-8 text-blue-600" />,
        bgColor: "bg-blue-50"
    },
    {
        level: "Degree",
        completed: 89,
        description: "ডিগ্রী শিক্ষার্থীদের রেজিস্ট্রেশন, সেমিস্টার ফর্ম ও মার্কশিট সংগ্রহের কাজ সম্পন্ন হয়েছে।",
        icon: <GraduationCap className="w-8 h-8 text-emerald-600" />,
        bgColor: "bg-emerald-50"
    },
    {
        level: "Honors",
        completed: 102,
        description: "অনার্স শিক্ষার্থীদের সকল বর্ষের আবেদন ও ডকুমেন্ট প্রোসেসিং নির্ভুলভাবে পরিচালিত।",
        icon: <Trophy className="w-8 h-8 text-orange-600" />,
        bgColor: "bg-orange-50"
    },
];

export default function AutomationOverview() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                
                {/* Section Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tighter">
                        সাফল্যের <span className="text-blue-600">মাইলফলক</span>
                    </h2>
                    <p className="text-gray-500 font-medium text-lg md:text-xl italic">
                        আমাদের মাধ্যমে সফলভাবে সম্পন্ন হওয়া শিক্ষাগত কার্যক্রমের একটি সংক্ষিপ্ত সারাংশ।
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {serviceStats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-100 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:-translate-y-2 text-center"
                        >
                            {/* Icon Box */}
                            <div className={`w-20 h-20 mx-auto rounded-3xl ${stat.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                {stat.icon}
                            </div>

                            <h3 className="text-2xl font-black text-gray-800 mb-4">{stat.level}</h3>
                            
                            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
                                {stat.description}
                            </p>

                            {/* Completed Badge */}
                            <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-lg">
                                <CheckCircle2 size={20} className="text-blue-400" />
                                {stat.completed}+ সম্পন্ন
                            </div>

                            {/* Decorative Background Number */}
                            <span className="absolute top-4 right-8 text-6xl font-black text-gray-50 group-hover:text-blue-50 transition-colors -z-0">
                                0{index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}