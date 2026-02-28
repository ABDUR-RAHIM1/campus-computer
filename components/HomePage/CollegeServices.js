import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  FileText,
  Building2,
  Smartphone,
  Globe2,
  ClipboardList,
  PlusCircle,
  ArrowUpRight
} from "lucide-react";

export default function SpecialtyServices() {
  const services = [
    {
      title: "অ্যাকাডেমিক আবেদন",
      icon: <GraduationCap className="w-10 h-10 text-blue-600 transition-transform group-hover:scale-110" />,
      desc: "কলেজ, অনার্স ও প্রফেশনাল কোর্সের ভর্তি সংক্রান্ত যাবতীয় আবেদন আমরা নির্ভুলভাবে সম্পন্ন করি।",
      borderColor: "group-hover:border-blue-500"
    },
    {
      title: "ডকুমেন্ট প্রোসেসিং",
      icon: <FileText className="w-10 h-10 text-emerald-600 transition-transform group-hover:scale-110" />,
      desc: "সার্টিফিকেট, মার্কশিট বা ট্রান্সক্রিপ্ট উত্তোলনের জটিল আবেদন প্রক্রিয়া এখন আরও সহজ ও দ্রুত।",
      borderColor: "group-hover:border-emerald-500"
    },
    {
      title: "ফিজিক্যাল সাবমিশন",
      icon: <Building2 className="w-10 h-10 text-indigo-600 transition-transform group-hover:scale-110" />,
      desc: "আপনার হয়ে আমাদের প্রতিনিধি সরাসরি কলেজে গিয়ে আবেদন জমা এবং ডকুমেন্ট কালেকশন করে দিবে।",
      borderColor: "group-hover:border-indigo-500"
    },
    {
      title: "স্মার্ট পেমেন্ট গেটওয়ে",
      icon: <Smartphone className="w-10 h-10 text-orange-600 transition-transform group-hover:scale-110" />,
      desc: "বিকাশ, নগদ বা রকেটের মাধ্যমে ঘরে বসেই সরকারি ফি এবং সার্ভিস চার্জ পেমেন্ট করার সুবিধা।",
      borderColor: "group-hover:border-orange-500"
    },
    {
      title: "রিয়েল-টাইম ট্র্যাকিং",
      icon: <Globe2 className="w-10 h-10 text-purple-600 transition-transform group-hover:scale-110" />,
      desc: "আপনার প্রতিটি আবেদনের সর্বশেষ অবস্থা (Status) আমাদের পোর্টালে লগইন করে সরাসরি দেখতে পাবেন।",
      borderColor: "group-hover:border-purple-500"
    },
    {
      title: "অফিসিয়াল রাইটিং",
      icon: <ClipboardList className="w-10 h-10 text-rose-600 transition-transform group-hover:scale-110" />,
      desc: "প্রফেশনাল CV তৈরি, ইমেইল এবং চাকরির অনলাইন ফরম ফিলাপে আমাদের বিশেষজ্ঞ টিমের সহায়তা।",
      borderColor: "group-hover:border-rose-500"
    },
  ];

  return (
    <section className="py-24 bg-[#fcfcfc] relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-10 right-[-5%] text-[15rem] font-black text-gray-50 select-none -z-0">
        SERVICES
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-3">
              <PlusCircle size={20} />
              <span className="uppercase tracking-widest text-sm">Specialized Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              আমাদের <span className="text-blue-600">বিশেষায়িত</span> সেবাসমূহ
            </h2>
          </div>
          <p className="text-gray-500 font-medium md:max-w-xs border-l-4 border-blue-100 pl-4">
            শিক্ষার্থীদের প্রতিটি ডিজিটাল প্রয়োজন মেটাতে আমরা তৈরি করেছি একটি ওয়ান-স্টপ সার্ভিস সেন্টার।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative bg-white border-2 border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50 ${service.borderColor} rounded-[2rem] overflow-hidden`}
            >
              <CardHeader className="pt-8 pb-4 flex flex-col items-center">
                <div className="p-4 rounded-2xl bg-gray-50 group-hover:bg-white transition-colors duration-500 mb-2">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-10 text-center px-8">
                <p className="text-gray-500 leading-relaxed font-medium text-sm">
                  {service.desc}
                </p>
              </CardContent>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-gray-300" size={20} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}