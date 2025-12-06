import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clock, Smartphone, Upload, ShieldCheck, FileCheck, XCircle, Headphones, Star } from "lucide-react";

export default function ServiceBenefits() {
  const points = [
    {
      title: "ঘরে বসে তথ্য জমা",
      icon: <Home className="w-8 h-8 text-blue-600" />,
      desc: "কলেজে না গিয়েও ঘরে বসে অনলাইনে সব তথ্য ও আবেদন জমা দিতে পারবেন।",
    },
    {
      title: "সময় ও খরচ সাশ্রয়",
      icon: <Clock className="w-8 h-8 text-green-600" />,
      desc: "দূরত্বে যাতায়াত বা লাইনে দাঁড়ানো ছাড়াই সময় ও খরচ দুটোই বাঁচবে।",
    },
    {
      title: "মোবাইল দিয়ে পেমেন্ট",
      icon: <Smartphone className="w-8 h-8 text-rose-600" />,
      desc: "Bkash, Nagad, Rocket সহ সব মোবাইল ব্যাংকিং মাধ্যমেই সহজে পেমেন্ট করুন।",
    },
    {
      title: "ফাইল আপলোড সুবিধা",
      icon: <Upload className="w-8 h-8 text-indigo-600" />,
      desc: "প্রয়োজনীয় ছবি বা ডকুমেন্ট সরাসরি আপনার প্রোফাইল থেকে আপলোড করতে পারবেন।",
    },
    {
      title: "তথ্যের ভুল রোধ ব্যবস্থা",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      desc: "প্রোফাইলের তথ্যের সাথে মিল না থাকলে আবেদন সাবমিট হবে না — ভুলের সুযোগ নেই।",
    },
    {
      title: "কাজের কনফার্মেশন রিপোর্ট",
      icon: <FileCheck className="w-8 h-8 text-purple-600" />,
      desc: "প্রতিটি কাজের অগ্রগতি ও সম্পূর্ণতার রিপোর্ট সরাসরি দেখতে পারবেন।",
    },
    {
      title: "অর্ডার বাতিল ও পেমেন্ট ফেরত",
      icon: <XCircle className="w-8 h-8 text-red-600" />,
      desc: "যদি কোন আবেদন বাতিল করতে চান, নির্দিষ্ট নিয়মে টাকা ফেরত পাবেন।",
    },
    {
      title: "২৪/৭ যোগাযোগ",
      icon: <Headphones className="w-8 h-8 text-orange-600" />,
      desc: "যে কোনো সময় আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে পারবেন।",
    },
    {
      title: "বিশেষ সুযোগ সুবিধা",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      desc: "নিয়মিত ইউজারদের জন্য রয়েছে অতিরিক্ত ছাড় ও এক্সক্লুসিভ সার্ভিস সুবিধা।",
    },
  ];

  return (
    <section className="py-12  servicesBenifitShadow">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🌟 আমাদের সেবা ব্যবহারের বিশেষ সুবিধাসমূহ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-all border border-indigo-400 bg-indigo-100 ">
              <CardHeader className="flex flex-col items-center space-y-3">
                {item.icon}
                <CardTitle className="text-lg font-semibold text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
