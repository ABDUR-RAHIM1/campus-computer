import Link from 'next/link';
import React from 'react';
import { GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32">
            {/* Background Decorative Circles */}
            <div className="absolute -top-24 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl opacity-60"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-blue-600/5 border border-blue-200 px-4 py-2 rounded-full mb-8">
                        <GraduationCap size={16} className="text-blue-600" />
                        <span className="text-xs md:text-sm font-bold text-blue-800 tracking-wide uppercase">
                            লালমনিরহাট সরকারি কলেজের শিক্ষার্থীদের বিশ্বস্ত সঙ্গী
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
                        স্বাগতম <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            ক্যাম্পাস কম্পিউটারে!
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        কলেজের পাশেই নির্ভরযোগ্য ডিজিটাল সেবা এক ছাদের নিচে। ভর্তি আবেদন থেকে রেজাল্ট—শিক্ষাজীবনের সকল অনলাইন সমাধান এখন আরও দ্রুত ও নির্ভুল।
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/services/college"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 group"
                        >
                            সেবাসমূহ দেখুন
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <div className="flex items-center gap-2 text-gray-500 font-bold text-sm px-6 py-4">
                            <ShieldCheck size={20} className="text-green-500" />
                            ১০০% নির্ভুল আবেদনের নিশ্চয়তা
                        </div>
                    </div>

                    {/* Floating Info */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-gray-100 pt-10">
                        <div className="text-center">
                            <p className="text-2xl font-black text-blue-600">০৫+</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">বছর অভিজ্ঞতা</p>
                        </div>
                        <div className="text-center border-x border-gray-100 px-4">
                            <p className="text-2xl font-black text-blue-600">১০০%</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">নির্ভরযোগ্যতা</p>
                        </div>
                        <div className="text-center col-span-2 md:col-span-1">
                            <p className="text-2xl font-black text-blue-600">৫০০+</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">সফল আবেদন</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
    );
}