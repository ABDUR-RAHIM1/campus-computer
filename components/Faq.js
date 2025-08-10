"use client"
import React, { useState } from "react";

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: '📝 কিভাবে অ্যাকাউন্ট খুলবো?',
            answer:
                'আপনার নাম, মোবাইল নাম্বার ও একটি পাসওয়ার্ড দিয়ে সহজেই আমাদের আপ্লিকেশনে  অ্যাকাউন্ট খুলতে পারবেন। অ্যাকাউন্ট বাটনে ক্লিক করে তথ্য দিন এবং সাবমিট করুন।',
        },
        {
            question: '📤 কিভাবে প্রোফাইল তৈরি করবো?',
            answer:
                'লগিন করার পর আপনি পাবেন একটা প্রোফাইল ড্যাশবোর্ড , সেখান থেকে প্রোফাইল তৈরি করুন বাটনে ক্লিক করে নির্দিষ্ট স্থানে নিজের অথবা বন্ধুর জন্য (প্রোফাইল) নাম , একাডেমিক তথ্য ছবি বা অন্যান্য প্রয়োজনীয় ফাইল সিলেক্ট করে আপলোড বাটনে ক্লিক করলেই প্রোফাইল তৈরি হয়ে যাবে।',
        },
        {
            question: '📱 কিভাবে পেমেন্ট করবো?',
            answer:
                'প্রতিটা সার্ভিসের আবেদন করুন বাটনে ক্লিক করলে নির্ধারিত মূল্য দেখাবে, পেমেন্ট অপশনে আপনার বিকাশ নাম্বার দিলেই নির্দিষ্ট পরিমান টাকা পেমেন্ট হয়ে যাবে।  আর আপনি পেমেন্ট কনফার্মেশন মেসেজ পাবেন।',
        },
        {
            question: '📦 আমি কিভাবে জানবো আমার কাজ শেষ হয়েছে কিনা?',
            answer:
                'আপনার প্রোফাইল ড্যাশবোর্ডে লগইন করে কাজের স্ট্যাটাস , পেমেন্ট স্ট্যাটাস সহ যাবতীয় তথ্য দেখতে পারবেন এবং কাজ শেষ হলে SMS/WhatsApp এর মাধ্যমে আপনাকে জানানো হবে।',
        },
    ];

    return (
        <section className="py-16 bg-blue-50" id="faq">
            <div className="container mx-auto px-4">
                <h2 className=" text-2xl md:text-3xl font-bold text-center text-blue-900 mb-10">
                    প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)
                </h2>
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((item, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden bg-white shadow">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left px-6 py-4 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none"
                            >
                                {item.question}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4 text-gray-700">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
