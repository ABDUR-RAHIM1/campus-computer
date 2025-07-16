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
                'আপনার নাম, মোবাইল নাম্বার ও একটি পাসওয়ার্ড দিয়ে সহজেই আমাদের ওয়েবসাইটে অ্যাকাউন্ট খুলতে পারবেন। রেজিস্ট্রেশন বাটনে ক্লিক করে তথ্য দিন এবং সাবমিট করুন।',
        },
        {
            question: '📤 কিভাবে ছবি বা ফাইল আপলোড করবো?',
            answer:
                'ফরম পূরণ করার সময় নির্দিষ্ট স্থানে ছবি, সার্টিফিকেট বা অন্যান্য প্রয়োজনীয় ফাইল সিলেক্ট করে আপলোড বাটনে ক্লিক করলেই ফাইল জমা হয়ে যাবে।',
        },
        {
            question: '📱 কিভাবে পেমেন্ট করবো?',
            answer:
                'আমাদের পেমেন্ট পেইজে গিয়ে বিকাশ/রকেট/নগদ এর মাধ্যমে নির্ধারিত নম্বরে টাকা পাঠিয়ে ট্রানজেকশন আইডি দিন। তারপর পেমেন্ট কনফার্মেশন পাবেন।',
        },
        {
            question: '📦 আমি কিভাবে জানবো আমার কাজ শেষ হয়েছে কিনা?',
            answer:
                'আপনার ড্যাশবোর্ডে লগইন করে কাজের স্ট্যাটাস দেখতে পারবেন। কাজ শেষ হলে SMS/WhatsApp এর মাধ্যমে আপনাকে জানানো হবে।',
        },
    ];

    return (
        <section className="py-16 bg-gray-50" id="faq">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                    ❓ প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)
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
