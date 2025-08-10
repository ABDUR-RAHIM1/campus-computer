 
import React from "react";

const serviceStats = [
    {
        level: "Intermediate",
        completed: 124,
        description: "ইন্টারমিডিয়েট স্তরের ফর্ম ফিলাপ, রেজিস্ট্রেশন ও সনদ উত্তোলন সফলভাবে সম্পন্ন হয়েছে।",
        icon: "📘",
    },
    {
        level: "Degree",
        completed: 89,
        description: "ডিগ্রী শিক্ষার্থীদের রেজিস্ট্রেশন, সেমিস্টার ফর্ম ও মার্কশিট সংগ্রহের কাজ সফলভাবে শেষ হয়েছে।",
        icon: "🎓",
    },
    {
        level: "Honors",
        completed: 102,
        description: "অনার্স শিক্ষার্থীদের সকল ধাপের কাজ সম্পূর্ণরূপে অটোমেটেডভাবে পরিচালনা করা হয়েছে।",
        icon: "🏆",
    },
];

export default function AutomationOverview() {
    return (
        <section className="bg-blue-50 py-10 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className=" text-2xl md:text-3xl font-bold text-blue-800 mb-6">
                     ওভারভিউ 
                </h2>
                <p className="text-blue-600 mb-10">
                    আমাদের মাধ্যমে সফলভাবে সম্পন্ন হওয়া শিক্ষাগত কার্যক্রমের সারাংশ। আপনি যেকোনো স্তরের ছাত্র/ছাত্রী হোন, নিশ্চিন্তে আমাদের উপর আস্থা রাখতে পারেন।
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {serviceStats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow p-6 border hover:shadow-lg transition"
                        >
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800">{stat.level}</h3>
                            <p className="text-sm text-gray-600 mt-2">{stat.description}</p>
                            <p className="text-2xl font-bold text-blue-600 mt-4">
                                ✅ {stat.completed}+ সম্পন্ন
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
