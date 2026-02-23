import React from 'react';
import {
    UserPlus,
    UserCog,
    LayoutGrid,
    Activity,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const studentSteps = [
    {
        id: 1,
        title: "অ্যাকাউন্ট তৈরি করো",
        description: "তোমার মোবাইল নম্বর দিয়ে খুব সহজেই একটি অ্যাকাউন্ট তৈরি করে নাও।",
        icon: <UserPlus className="text-blue-600" />,
        color: "bg-blue-100",
        stepText: "Step 01"
    },
    {
        id: 2,
        title: "প্রোফাইল সাজাও",
        description: "তোমার নাম, কলেজ ও প্রয়োজনীয় তথ্য দিয়ে প্রোফাইল আপডেট করো।",
        icon: <UserCog className="text-orange-600" />,
        color: "bg-orange-100",
        stepText: "Step 02"
    },
    {
        id: 3,
        title: "সার্ভিস বেছে নাও",
        description: "তোমার প্রয়োজনীয় ভর্তি আবেদন বা ডিজিটাল সার্ভিসটি সিলেক্ট করো।",
        icon: <LayoutGrid className="text-emerald-600" />,
        color: "bg-emerald-100",
        stepText: "Step 03"
    },
    {
        id: 4,
        title: "ট্র্যাকিং করো",
        description: "আবেদনের বর্তমান অবস্থা ও পেমেন্ট হিস্ট্রি ড্যাশবোর্ড থেকে দেখে নাও।",
        icon: <Activity className="text-purple-600" />,
        color: "bg-purple-100",
        stepText: "Step 04"
    }
];

export default function StudentJourney() {
    return (
        <section className="py-24 bg-[#fcfcfc] overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-blue-600 font-black tracking-widest uppercase text-xs bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                        How it works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-6 mb-4">
                        খুব সহজেই <span className="text-blue-600">শুরু করো</span>
                    </h2>
                    <p className="text-gray-500 font-medium italic">
                        নিচের ৪টি সহজ ধাপ অনুসরণ করে তোমার স্মার্ট স্টুডেন্ট লাইফ এনজয় করো।
                    </p>
                </div>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {studentSteps.map((step, index) => (
                        <div key={step.id} className="relative group">

                            {/* Card Body */}
                            <div className="h-full bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-2 flex flex-col items-center text-center">

                                {/* Icon & Step Label */}
                                <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-6 relative group-hover:rotate-6 transition-transform duration-500`}>
                                    {React.cloneElement(step.icon, { size: 36 })}

                                    <div className="absolute -top-3 -right-3 bg-white shadow-md px-2 py-0.5 rounded-lg border border-gray-100 text-[10px] font-black text-gray-400">
                                        {step.stepText}
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Connecting Arrow (for Desktop) */}
                                {index !== studentSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10 text-gray-200 group-hover:text-blue-200 group-hover:translate-x-1 transition-all">
                                        <ArrowRight size={24} />
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

                {/* Bottom CTA Card */}
                <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-200">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black mb-2">তুমি কি আজই শুরু করতে চাও?</h3>
                        <p className="opacity-80 font-medium">অ্যাকাউন্ট তৈরি করে স্মার্টলি আবেদন সম্পন্ন করো।</p>
                    </div>
                    <Link href={"/student-login"} className=" bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                        রেজিস্ট্রেশন করো <ArrowRight size={20} />
                    </Link>
                </div>

            </div>
        </section>
    );
}