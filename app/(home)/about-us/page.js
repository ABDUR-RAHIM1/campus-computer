// app/about/page.jsx
import React from "react";
import { Target, MapPin, Rocket, Heart, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "আমাদের সম্পর্কে | Campus Computer",
    description:
        "Campus Computer – কলেজ ক্যাম্পাসের শিক্ষার্থীদের জন্য ডিজাইন করা এক্সক্লুসিভ সেবা। ভর্তি, ফর্ম, পেমেন্ট ও অন্যান্য কলেজ কার্যক্রম সহজ করার লক্ষ্য।",
};

export default function AboutPage() {
    return (
        <section className="py-12 bg-white text-gray-800">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                
                {/* Hero Section */}
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900">
                        আমাদের সম্পর্কে
                    </h1>
                    <div className="h-1.5 w-24 bg-green-500 mx-auto rounded-full"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed pt-4">
                        <span className="text-blue-700 font-bold">Campus Computer</span> এর জন্ম হয়েছে শিক্ষার্থীদের জন্য। 
                        যেমন কলেজ ক্যাম্পাস আপনাদের স্বপ্ন পূরণের জায়গা, আমাদের লক্ষ্য ঠিক তেমন— 
                        <span className="text-green-600">সব সেবা আপনার হাতের নাগালে পৌঁছে দেওয়া।</span>
                    </p>
                </div>

                {/* Values / Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 space-y-4 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900">আমাদের লক্ষ্য</h3>
                        <p className="text-gray-600 text-sm leading-6">
                            ভর্তি ফরম, পেমেন্ট ও ফাইল জমা দেওয়ার প্রক্রিয়াকে দ্রুত, নিরাপদ এবং ডিজিটাল পদ্ধতিতে সম্পন্ন করা।
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-green-50 border border-green-100 space-y-4 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white">
                            <Heart size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-green-900">Helping Mindset</h3>
                        <p className="text-gray-600 text-sm leading-6">
                            এটি আমাদের কাছে শুধু সেবা নয়, বরং শিক্ষার্থীদের সমস্যা সমাধানের একটি কার্যকর ও সহানুভূতিশীল প্রচেষ্টা।
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-orange-50 border border-orange-100 space-y-4 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-orange-900">নিরাপত্তা ও স্বচ্ছতা</h3>
                        <p className="text-gray-600 text-sm leading-6">
                            আপনার ব্যক্তিগত তথ্য এনক্রিপশন ও শতভাগ স্বচ্ছতার সাথে আমরা প্রতিটি আবেদন প্রক্রিয়া সম্পন্ন করি।
                        </p>
                    </div>
                </div>

                {/* Our Journey Section */}
                <div className="relative p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-hidden mb-20 shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 bg-blue-700/50 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/30">
                                <Rocket size={16} /> আমাদের যাত্রা
                            </div>
                            <h2 className="text-3xl font-bold">লালমনিরহাট থেকে শুরু...</h2>
                            <p className="text-blue-100 leading-relaxed text-lg">
                                আমরা বর্তমানে লালমনিরহাট সরকারি কলেজ এবং আদিতমারী সরকারি কলেজের শিক্ষার্থীদের সরাসরি সেবা প্রদান করছি। আমাদের মূল উদ্দেশ্য হলো স্থানীয় শিক্ষার্থীদের ডিজিটাল ভোগান্তি কমিয়ে একাডেমিক কাজে পূর্ণ মনোযোগ দিতে সহায়তা করা।
                            </p>
                        </div>
                        <div className="flex-none bg-white/10 p-6 rounded-3xl backdrop-blur-sm border border-white/20">
                            <div className="text-center">
                                <p className="text-4xl font-black text-green-400">২+</p>
                                <p className="text-sm uppercase tracking-widest mt-1 opacity-80">সংযুক্ত কলেজ</p>
                            </div>
                        </div>
                    </div>
                    {/* Abstract Circle Background */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
                </div>

                {/* Offices Section */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <MapPin className="text-red-500" />
                        <h2 className="text-2xl font-bold text-gray-800">আমাদের অফিসসমূহ</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 transition-colors">
                            <h4 className="font-bold text-lg text-blue-800 group-hover:text-blue-600">লালমনিরহাট সরকারি কলেজ</h4>
                            <p className="text-gray-500 mt-2 italic">কলেজ বাজার, লালমনিরহাট।</p>
                        </div>
                        <div className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 transition-colors">
                            <h4 className="font-bold text-lg text-blue-800 group-hover:text-blue-600">আদিতমারী সরকারি কলেজ</h4>
                            <p className="text-gray-500 mt-2 italic">স্বনির্ভর কম্পিউটার ট্রেনিং সেন্টার, রেল-ষ্টেশন, আদিতমারী।</p>
                        </div>
                    </div>
                </div>

                {/* Footer Statement */}
                <div className="mt-20 pt-10 border-t border-gray-100 text-center">
                    <p className="text-gray-500 italic max-w-2xl mx-auto">
                        <span className="font-bold text-blue-800">Campus Computer</span> প্রতিটি শিক্ষার্থীর স্বপ্ন পূরণের যাত্রায় একটি নির্ভরযোগ্য ডিজিটাল সারথি হয়ে থাকতে চায়।
                    </p>
                </div>
            </div>
        </section>
    );
}