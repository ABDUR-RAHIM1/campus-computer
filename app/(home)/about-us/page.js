// app/about/page.jsx
import React from "react";

export const metadata = {
    title: "আমাদের সম্পর্কে | Campus Computer",
    description:
        "Campus Computer – কলেজ ক্যাম্পাসের শিক্ষার্থীদের জন্য ডিজাইন করা এক্সক্লুসিভ সেবা। ভর্তি, ফর্ম, পেমেন্ট ও অন্যান্য কলেজ কার্যক্রম সহজ করার লক্ষ্য।",
};

export default function AboutPage() {
    return (
        <section className="py-16 px-4 md:px-16 bg-gray-50 text-gray-800">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-blue-800 text-center">
                    আমাদের সম্পর্কে
                </h1>

                {/* Intro */}
                <p className="text-center text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
                    <strong>Campus Computer</strong> এর জন্ম হয়েছে শিক্ষার্থীদের জন্য।
                    ঠিক যেমন কলেজ ক্যাম্পাস তাদের স্বপ্ন পূরণের জায়গা, আমাদের অ্যাপও ঠিক তেমন —
                    <strong>শিক্ষার্থীদের সকল সুযোগ-সুবিধা ঘরে বসে সহজে পাওয়ার জন্য।</strong>
                </p>

                {/* Vision & Mission */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-blue-800">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
                    <p>
                        আমাদের লক্ষ্য শিক্ষার্থীদের জীবন সহজ করা। ভর্তি ফরম, পেমেন্ট, ফাইল জমা এবং অন্যান্য কলেজ কার্যক্রম যাতে দ্রুত, নিরাপদ এবং সঠিকভাবে সম্পন্ন হয়,
                        তা নিশ্চিত করা আমাদের মূল উদ্দেশ্য।
                    </p>
                    <p>
                        আমরা বিশ্বাস করি, প্রযুক্তি এবং সহানুভূতিশীল মানসিকতা মিলিয়ে শিক্ষার্থীর জন্য কার্যকর সহায়তা দেওয়া সম্ভব।
                        এটি আমাদের ব্যবসা নয়, এটি একটি <strong>helping mindset</strong>, <strong>সমস্যা সমাধানের পথিক</strong>।
                    </p>
                </div>

                {/* Our Journey */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-blue-800">আমাদের যাত্রা</h2>
                    <p>
                        আমরা সম্প্রতি লালমনিরহাট এবং আদিতমারী সরকারি কলেজের শিক্ষার্থীদের সাহায্য করার জন্য কাজ শুরু করেছি।
                        শিক্ষার্থীদের ঘরে বসে সহজভাবে সকল কলেজ কার্যক্রম সম্পন্ন করতে সহায়তা করা আমাদের প্রধান কাজ।
                    </p>
                </div>

                {/* Our Offices */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-blue-800">আমাদের অফিস</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <strong>লালমনিরহাট সরকারি কলেজ:</strong> কলেজ বাজার, লালমনিরহাট। 
                        </li>
                        <li>
                            <strong>আদিতমারী সরকারি কলেজ:</strong> স্বনির্ভর কম্পিউটার ট্রেনিং সেন্টার, রেল-ষ্টেশন, আদিতমারী। 
                        </li>
                    </ul>
                </div>

                {/* Closing Statement */}
                <div className="space-y-4">
                    <p>
                        <strong>Campus Computer</strong> প্রতিটি শিক্ষার্থীকে তার স্বপ্ন পূরণের পথে সহায়তা করতে প্রতিশ্রুতিবদ্ধ।
                        আমাদের সাথে থাকুন এবং আপনার কলেজ জীবনকে সহজ এবং সঠিকভাবে পরিচালিত করুন।
                    </p>
                </div>
            </div>
        </section>
    );
}
