import React from 'react';
import { PhoneCall, MessageSquare, Clock, Headphones } from 'lucide-react';

export default function StudentHelpline() {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-blue-200">

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-300 opacity-10 rounded-full blur-3xl"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

                        {/* Text Content */}
                        <div className="text-center lg:text-left max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6 border border-white/30">
                                <Headphones size={18} className="animate-pulse" />
                                <span className="text-sm font-bold uppercase tracking-widest">২৪/৭ স্টুডেন্ট সাপোর্ট</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                কোনো কিছু বুঝতে <br /> <span className="text-blue-200 text-4xl md:text-6xl italic">সমস্যা হচ্ছে?</span>
                            </h2>
                            <p className="text-blue-50 text-lg md:text-xl font-medium opacity-90 mb-8">
                                আমাদের এক্সপার্ট টিম তোমার যেকোনো প্রশ্নের উত্তর দিতে প্রস্তুত। দ্বিধা না করে এখনই যোগাযোগ করো।
                            </p>

                            {/* Service Hours */}
                            <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80 font-bold">
                                <Clock size={20} className="text-blue-300" />
                                <span>সকাল ৯:০০ - রাত ১০:০০ (সরাসরি কল)</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Call Button */}
                            <a
                                href="tel:+8801611530939"
                                className="flex items-center justify-center gap-3 bg-white text-blue-700 hover:bg-blue-50 px-8 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:scale-105 active:scale-95"
                            >
                                <PhoneCall size={24} />
                                সরাসরি কল
                            </a>

                            {/* WhatsApp Button */}
                            <a
                                href="https://wa.me/8801611530939"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:scale-105 active:scale-95"
                            >
                                <MessageSquare size={24} />
                                হোয়াটসঅ্যাপ
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}