import React from "react";
import Image from "next/image";

import home from "@/public/images/howToWork/home.jpg";
import homeM from "@/public/images/howToWork/homeM.jpg";
import login from "@/public/images/howToWork/login.jpg";
import loginM from "@/public/images/howToWork/loginM.jpg";
import profile from "@/public/images/howToWork/profile.jpg";
import profileM from "@/public/images/howToWork/profileM.jpg";
import createOrder from "@/public/images/howToWork/createOrder.jpg";
import createOrderM from "@/public/images/howToWork/createOrderM.jpg";
import orderProccess from "@/public/images/howToWork/orderProccess.jpg";
import orderProccessM from "@/public/images/howToWork/orderProccessM.jpg";
import applyDone from "@/public/images/howToWork/applyDone.jpg";
import applyDoneM from "@/public/images/howToWork/applyDoneM.jpg";
import orderPage from "@/public/images/howToWork/orderPage.jpg";
import orderPageM from "@/public/images/howToWork/orderPageM.jpg";


export default function HowToWork() {
  const steps = [
    {
      title: "ধাপ ১: হোম পেজ",
      description:
        "আপনি প্রথমবার সফটওয়্যারটি ওপেন করলে হোম পেজ দেখতে পাবেন। এখান থেকেই সব ফিচার শুরু (মোবাইল ও ডেস্কটপ ভার্শনে)। আপনার সমস্ত কার্যকলাপ কে সহজ করতে এখান থেকে একাউন্ট বাটনে (লাল দাগ দেওয়া) ক্লিক করে প্রথমেই একটি একাউন্ট করে নিতে হবে।",
      desktopImage: home,
      mobileImage: homeM,
    },
    {
      title: "ধাপ ২: লগইন / রেজিস্ট্রেশন",
      description:
        "হোম পেজের লগইন বাটন থেকে আপনার একাউন্টে লগইন করুন। নতুন হলে রেজিস্ট্রেশন করে লগইন করুন। লগইন সফল হলে আপনার প্রোফাইল পেজে নিয়ে যাবে।",
      desktopImage: login,
      mobileImage: loginM,
    },
    {
      title: "ধাপ ৩: প্রোফাইল পেজ",
      description:
        "লগইন করার পরে আপনার প্রোফাইল দেখা যাবে। এখানে আপনার ব্যক্তিগত অথবা সহপাঠীর জন্য জব/কলেজ প্রোফাইল তৈরি করুন। যার উপর ভিত্তি করে আপনার জন্য প্রয়োজনীয়  কাজগুলো করা হবে। ",
      desktopImage: profile,
      mobileImage: profileM,
    },
    {
      title: "ধাপ ৪: নতুন আবেদন তৈরি",
      description:
        "প্রোফাইল থেকে সার্ভিস ের নাম সহ বিস্তারিত দেখে আপনার সাথে মিলে এমন সারভিসের  'আবেদন করুন' বাটনে ক্লিক করুন।",
      desktopImage: createOrder,
      mobileImage: createOrderM,
    },
    {
      title: "ধাপ ৫: আবেদন প্রসেস",
      description:
        "এখানে আপনার তৈরি করা প্রোফাইল নির্বাচন করুন (যে প্রোফাইলের জন্য আবেদন করতে চান), তাহলে প্রোফাইলে থাকা বিভাগ, সেশন ইত্যাদির সাথে মিলে এমন সার্ভিস চার্জ নিল কালারের দেখাবে - পাশে লেখা থাকবে এটি আপনার বিভাগ অন্যথায় এটি আপনার বিভাগ নয় লেখা দেখাবে এবং  লাল রঙের দেখাবে। আপনার নির্বাচন করা বিভাগ থেকে কলেজ ফী, চার্জ ফী সহ কতটাকা পাঠাতে হবে সেটা দেখাবে, পেমেন্ট বিবরণ থেকে সব কিছুই দেখা যাবে কথায় কত টাকা লাগতেছে।",
      desktopImage: orderProccess,
      mobileImage: orderProccessM,
    },
    {
      title: "ধাপ ৬: পেমেন্ট ও আবেদন সম্পন্ন",
      description:
        "আপনার প্রোফাইল তথ্য মিলে গেলে , সব কিছু চেক করে নির্ধারিত টাকা পরিশোধ করুন",
      desktopImage: applyDone,
      mobileImage: applyDoneM,
    },
    {
      title: "ধাপ ৭: আবেদন হিস্টরি",
      description:
        "সব আবেদন দেখতে অর্ডার পেজে যান। সেখানে আপনার সমস্ত আবেদন গুলো এবং আবেদনের বর্তমান অবস্থা (প্রেসেসিং, পেন্ডিং না সাকসেস) সব দেখতে পারবেন। ভুলক্রমে কোন আবেদন হয়ে গেলে মেনেজ বাটনে ক্লিক করে আবেদন বাতিল বা আপডেট করতে পারবেন। আবেদন সফল হলে আপনার ফোন মেসেজের মাধ্যমে জানিয়ে দেওয়া হবে।",
      desktopImage: orderPage,
      mobileImage: orderPageM,
    },
  ];

  return (
    <div className="w-full min-h-screen py-10 bg-gray-50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          কীভাবে সফটওয়্যারটি ব্যবহার করবেন
        </h1>
        <p className="text-center text-gray-600 mb-10">
          নিচের ধাপগুলো অনুসরণ করে সহজেই সফটওয়্যারটি ব্যবহার করতে পারবেন।
        </p>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 md:p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h2>

              <p className="text-gray-600 mb-5">{step.description}</p>

              {/* Image Block */}
              <div className="w-full bg-gray-100 rounded-lg p-4 border border-dashed border-gray-300">
                <div className="w-full flex flex-col md:flex-row md:justify-between gap-6">

                  {/* Desktop Image – 70% */}
                  <div className="w-full md:w-[70%] flex flex-col items-center">
                    <h3 className="text-gray-700 font-medium mb-2">ডেস্কটপ ভার্সন</h3>

                    {step.desktopImage ? (
                      <Image
                        src={step.desktopImage}
                        alt="desktop version"
                        width={900}
                        height={500}
                        className="rounded-md shadow w-full h-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded border border-dashed border-gray-400 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">ছবি যুক্ত করা হয়নি</span>
                      </div>
                    )}
                  </div>

                  {/* Mobile Image – 28% */}
                  <div className="w-full md:w-[28%] flex flex-col items-center">
                    <h3 className="text-gray-700 font-medium mb-2">মোবাইল ভার্সন</h3>

                    {step.mobileImage ? (
                      <Image
                        src={step.mobileImage}
                        alt="mobile version"
                        width={350}
                        height={700}
                        className="rounded-md shadow w-full h-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded border border-dashed border-gray-400 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">ছবি যুক্ত করা হয়নি</span>
                      </div>
                    )}
                  </div>


                </div>
              </div>

            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
