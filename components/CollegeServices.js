import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, FileText, Building2, Smartphone, Globe2, ClipboardList } from "lucide-react";

export default function CollegeServices() {
  const services = [
    {
      title: "আবেদন",
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      desc: "কলেজ, অনার্স ও ভর্তি সংক্রান্ত আবেদন সহজে জমা দিন। আমাদের টিম সম্পূর্ণ প্রসেস করে দিবে।",
    },
    {
      title: "সার্টিফিকেট ও ট্রান্সক্রিপ্ট",
      icon: <FileText className="w-8 h-8 text-green-600" />,
      desc: "ডিগ্রি সার্টিফিকেট, রেজাল্ট কার্ড, ট্রান্সক্রিপ্ট বা অন্যান্য একাডেমিক ডকুমেন্টের আবেদন করুন।",
    },
    {
      title: "কলেজ ডকুমেন্ট সাবমিশন",
      icon: <Building2 className="w-8 h-8 text-indigo-600" />,
      desc: "আমাদের টিম আপনার পক্ষে কলেজে গিয়ে আবেদন জমা ও কালেকশন সম্পন্ন করে দিবে।",
    },
    {
      title: "মোবাইল ব্যাংকিং পেমেন্ট",
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      desc: "Bkash, Nagad, Rocket সহ সকল মোবাইল ব্যাংকিং মাধ্যমে পেমেন্ট করুন নিরাপদে।",
    },
    {
      title: "অনলাইন আবেদন ট্র্যাকিং",
      icon: <Globe2 className="w-8 h-8 text-purple-600" />,
      desc: "আপনার জমাকৃত আবেদন ও কাজের অবস্থা রিয়েল টাইমে ট্র্যাক করতে পারবেন।",
    },
    {
      title: "ফর্ম ফিলাপ ও ডকুমেন্ট সহায়তা",
      icon: <ClipboardList className="w-8 h-8 text-rose-600" />,
      desc: "বিভিন্ন ফর্ম ফিলাপ, CV তৈরি, চাকরির আবেদন ও অন্যান্য কম্পিউটার সার্ভিস সহায়তা।",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
     
      <div className="container mx-auto px-4 z-30">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🎓 কলেজ সার্ভিস সেন্টার
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardHeader className="flex flex-col items-center space-y-3">
                {service.icon}
                <CardTitle className="text-lg font-semibold text-center">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
