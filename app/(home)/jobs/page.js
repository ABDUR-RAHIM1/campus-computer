"use client";
import React, { useState } from "react";

const categories = [
    "BRAC",
    "ASA",
    "TMSS",
    "Bureau Bangladesh",
    "Grameen Bank",
    "Save The Children",
];

const jobs = [
  {
    id: 1,
    title: "শাখা ব্যবস্থাপক",
    organization: "BRAC",
    location: "রংপুর",
    description:
      "BRAC মাইক্রোফাইন্যান্স বিভাগে শাখা ব্যবস্থাপক নিয়োগ দেওয়া হবে। কমপক্ষে স্নাতক পাস এবং মাঠ পর্যায়ে কাজ করার অভিজ্ঞতা থাকতে হবে।",
  },
  {
    id: 2,
    title: "ফিল্ড অফিসার",
    organization: "ASA",
    location: "কুড়িগ্রাম",
    description:
      "ASA এনজিও তে মাঠ পর্যায়ে কাজ করার জন্য ফিল্ড অফিসার নিয়োগ। মোটরসাইকেল চালাতে জানতে হবে।",
  },
  {
    id: 3,
    title: "প্রজেক্ট কো-অর্ডিনেটর",
    organization: "Save The Children",
    location: "ঢাকা",
    description:
      "ইউনিসেফ ফান্ডেড প্রকল্পে প্রজেক্ট কো-অর্ডিনেটর পদে অভিজ্ঞদের অগ্রাধিকার দেওয়া হবে। ইংরেজিতে যোগাযোগ দক্ষতা প্রয়োজন।",
  },
  {
    id: 4,
    title: "অডিট অফিসার",
    organization: "TMSS",
    location: "বগুড়া",
    description:
      "TMSS সংস্থার অডিট বিভাগে স্নাতকোত্তর ডিগ্রীধারী অডিট অফিসার নিয়োগ। MS Excel ও সফট রিপোর্টিংয়ে পারদর্শিতা থাকতে হবে।",
  },
  {
    id: 5,
    title: "হেল্থ প্রমোটার",
    organization: "Marie Stopes Bangladesh",
    location: "চট্টগ্রাম",
    description:
      "মহিলাদের প্রজনন স্বাস্থ্যসেবা বিষয়ে সচেতনতা বৃদ্ধির জন্য হেল্থ প্রমোটার নিয়োগ। নার্সিং ডিপ্লোমা/সমমানের ডিগ্রী প্রয়োজন।",
  },
  {
    id: 6,
    title: "কমিউনিটি মোবিলাইজার",
    organization: "Care Bangladesh",
    location: "বরিশাল",
    description:
      "Community development প্রজেক্টে কাজ করার জন্য স্থানীয় বাসিন্দাদের অগ্রাধিকার ভিত্তিতে কমিউনিটি মোবিলাইজার নিয়োগ।",
  },
  {
    id: 7,
    title: "ফিন্যান্স অফিসার",
    organization: "World Vision",
    location: "ময়মনসিংহ",
    description:
      "World Vision এর Child Sponsorship প্রজেক্টে ফিন্যান্স অফিসার নিয়োগ। Accounting সফটওয়্যার ব্যবহারে দক্ষতা থাকতে হবে।",
  },
  {
    id: 8,
    title: "ডাটা এন্ট্রি অপারেটর",
    organization: "Caritas Bangladesh",
    location: "যশোর",
    description:
      "প্রজেক্ট ডকুমেন্টেশন ও ডাটা সংগ্রহের জন্য অভিজ্ঞ ডাটা এন্ট্রি অপারেটর খোঁজা হচ্ছে। টাইপিং স্পিড ভালো হতে হবে।",
  },
  {
    id: 9,
    title: "সোশ্যাল ওয়ার্কার",
    organization: "Red Crescent Society",
    location: "লালমনিরহাট",
    description:
      "দূর্যোগ মোকাবেলা এবং স্বাস্থ্য সেবা বিষয়ক প্রজেক্টে সোশ্যাল ওয়ার্কার পদে লোক নিয়োগ। অভিজ্ঞতা অগ্রাধিকার পাবে।",
  },
  {
    id: 10,
    title: "প্রজেক্ট অ্যাসিস্ট্যান্ট",
    organization: "Manusher Jonno Foundation",
    location: "দিনাজপুর",
    description:
      "স্থানীয় পর্যায়ে শিশু ও নারী উন্নয়ন প্রকল্পে কাজ করার জন্য প্রজেক্ট অ্যাসিস্ট্যান্ট নিয়োগ। রিপোর্ট লেখায় দক্ষতা থাকা আবশ্যক।",
  },
];


export default function Jobs() {
    const [expandedJobId, setExpandedJobId] = useState(null);

    const toggleDescription = (id) => {
        setExpandedJobId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <aside className="bg-white p-4 rounded shadow md:col-span-1">
                <h3 className="text-lg font-semibold mb-2">📁 নিয়োগকারী প্রতিষ্ঠানসমূহ</h3>
                <ul className="space-y-1 text-sm">
                    {categories.map((cat, i) => (
                        <li key={i} className="border-b py-1 text-gray-700">
                            ✅ {cat}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Job List */}
            <main className="bg-white p-6 rounded shadow md:col-span-3 space-y-4">
                <h2 className="text-xl font-bold mb-4">📰 সকল চাকরির তালিকা</h2>

                {jobs.map((job) => (
                    <div key={job.id} className="border rounded p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                                <p className="text-sm text-gray-600">
                                    🏢 {job.organization} | 📍 {job.location}
                                </p>
                            </div>
                            <button
                                onClick={() => toggleDescription(job.id)}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                {expandedJobId === job.id ? "বন্ধ করুন" : "বিস্তারিত দেখুন"}
                            </button>
                        </div>

                        {expandedJobId === job.id && (
                            <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                {job.description}
                            </div>
                        )}
                    </div>
                ))}
            </main>
        </div>
    );
}
