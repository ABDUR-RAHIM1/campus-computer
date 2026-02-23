import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Home, Clock, Smartphone, Upload, ShieldCheck,
    FileCheck, XCircle, Headphones, Star, CheckCircle
} from "lucide-react";

export default function ServiceBenefits() {
    const points = [
        {
            title: "ঘরে বসে তথ্য জমা",
            icon: <Home className="w-8 h-8 text-blue-600" />,
            desc: "কলেজে না গিয়েও ঘরে বসে অনলাইনে সব তথ্য ও আবেদন জমা দিতে পারবেন।",
            badge: "Comfort"
        },
        {
            title: "সময় ও খরচ সাশ্রয়",
            icon: <Clock className="text-emerald-600" />,
            desc: "দূরত্বে যাতায়াত বা লাইনে দাঁড়ানো ছাড়াই সময় ও খরচ দুটোই বাঁচবে।",
            badge: "Save Money"
        },
        {
            title: "মোবাইল পেমেন্ট",
            icon: <Smartphone className="text-rose-600" />,
            desc: "Bkash, Nagad, Rocket সহ সব মোবাইল ব্যাংকিং মাধ্যমেই সহজে পেমেন্ট করুন।",
            badge: "Easy Pay"
        },
        {
            title: "ফাইল আপলোড",
            icon: <Upload className="text-indigo-600" />,
            desc: "প্রয়োজনীয় ছবি বা ডকুমেন্ট সরাসরি আপনার প্রোফাইল থেকে আপলোড করতে পারবেন।",
            badge: "Digital"
        },
        {
            title: "ভুল রোধ ব্যবস্থা",
            icon: <ShieldCheck className="text-emerald-600" />,
            desc: "তথ্যের মিল না থাকলে আবেদন সাবমিট হবে না — ভুলের সুযোগ নেই বললেই চলে।",
            badge: "Secure"
        },
        {
            title: "কনফার্মেশন রিপোর্ট",
            icon: <FileCheck className="text-purple-600" />,
            desc: "প্রতিটি কাজের অগ্রগতি ও সম্পূর্ণতার রিপোর্ট সরাসরি ড্যাশবোর্ড থেকে দেখতে পারবেন।",
            badge: "Real-time"
        },
        {
            title: "রিফান্ড পলিসি",
            icon: <XCircle className="text-red-600" />,
            desc: "যদি কোন আবেদন বাতিল করতে চান, নির্দিষ্ট নিয়মে আপনার টাকা ফেরত পাবেন।",
            badge: "Refund"
        },
        {
            title: "২৪/৭ সাপোর্ট",
            icon: <Headphones className="text-orange-600" />,
            desc: "যে কোনো সময় আমাদের ডেডিকেটেড সাপোর্ট টিমের সাথে যোগাযোগ করতে পারবেন।",
            badge: "Support"
        },
        {
            title: "বিশেষ অফার",
            icon: <Star className="text-yellow-500" />,
            desc: "নিয়মিত ইউজারদের জন্য রয়েছে অতিরিক্ত ছাড় ও এক্সক্লুসিভ সার্ভিস সুবিধা।",
            badge: "Rewards"
        },
    ];

    return (
        <section className="py-24 bg-indigo-50/30 relative">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">
                        <CheckCircle size={14} /> Why Choose Us
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                        কেন আমাদের <span className="text-indigo-600">সার্ভিস</span> ব্যবহার করবেন?
                    </h2>
                    <p className="text-gray-500 font-medium">
                        আমরা শুধু আবেদন করি না, আপনার একাডেমিক যাত্রাকে সহজ ও দুশ্চিন্তামুক্ত করার দায়িত্ব নেই।
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {points.map((item, index) => (
                        <Card
                            key={index}
                            className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/50 border-indigo-100 bg-white rounded-3xl"
                        >
                            <div className="absolute top-0 right-0 p-3">
                                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-tighter">
                                    {item.badge}
                                </span>
                            </div>

                            <CardHeader className="pt-8 pb-4 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
                                    {React.cloneElement(item.icon, { className: "w-8 h-8 transition-colors duration-500" })}
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-800">
                                    {item.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="pb-10">
                                <p className="text-sm text-gray-500 text-center font-medium leading-relaxed">
                                    {item.desc}
                                </p>
                            </CardContent>

                            {/* Decorative Accent Line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-600 transition-all duration-500 group-hover:w-full"></div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}