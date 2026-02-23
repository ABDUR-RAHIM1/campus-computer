import React from 'react';
import { Quote, Star } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "আরিফুল ইসলাম",
        college: "লালমনিরহাট সরকারি কলেজ",
        location: "ঢাকা (চাকরিরত)",
        comment: "আমি জীবিকার তাগিদে শহরে থাকি। বেশি সময় নিয়ে কলেজে গিয়ে কম্পিউটার দোকানে ভিড়ের মধ্যে ফরম পূরণ করা আমার জন্য প্রায় অসম্ভব ছিল। কিন্তু ক্যাম্পাস কম্পিউটার সফটওয়্যার ব্যবহার করে এখান থেকেই অফিসের ফাঁকে নিজের কাজ শেষ করতে পেরেছি। আমার সময় ও ছুটি দুটোই বেঁচেছে!",
        imageColor: "bg-blue-100 text-blue-600"
    },
    {
        id: 2,
        name: "নুসরাত জাহান",
        college: "আদিতমারী সরকারি কলেজ",
        location: "আদিতমারী",
        comment: "আগে ছোট একটা কাজের জন্য দোকানে গিয়ে ঘণ্টার পর ঘণ্টা বসে থাকতে হতো। এখন নিজের প্রোফাইল থেকে ডকুমেন্ট আপলোড করে দিলেই ক্যাম্পাস কম্পিউটার টিম কাজ করে দেয়। সবচেয়ে ভালো লাগে তাদের ট্র্যাকিং সিস্টেমটা, কাজ কতদূর হলো তা মোবাইলেই দেখা যায়।",
        imageColor: "bg-emerald-100 text-emerald-600"
    },
    {
        id: 3,
        name: "তানভীর আহমেদ",
        college: "অনার্স ৩য় বর্ষ",
        location: "কালীগঞ্জ",
        comment: "অনলাইনে পেমেন্ট নিয়ে খুব ভয়ে থাকতাম। কিন্তু এই প্ল্যাটফর্মের রিফান্ড পলিসি আর পেমেন্ট রিপোর্ট দেখে এখন অনেক নিশ্চিন্তে কাজ করি। গত কয়েক বছরে আমার সব ফরম ফিলাপ এখানেই করেছি, একবারও ভুল হয়নি। তাদের সার্ভিস সত্যিই আস্থার প্রতীক।",
        imageColor: "bg-orange-100 text-orange-600"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                        শিক্ষার্থীদের <span className="text-blue-600">আস্থার গল্প</span>
                    </h2>
                    <p className="text-gray-500 font-medium">
                        শহরের চাকুরে থেকে গ্রামের সাধারণ স্টুডেন্ট—সবার সমস্যার সমাধান দিচ্ছে ক্যাম্পাস কম্পিউটার।
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="group p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 relative">

                            {/* Quote Icon */}
                            <div className="absolute top-8 right-8 text-blue-100 group-hover:text-blue-200 transition-colors">
                                <Quote size={40} fill="currentColor" />
                            </div>

                            {/* Ratings */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-600 font-medium leading-relaxed mb-8 italic">
                                "{review.comment}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${review.imageColor}`}>
                                    {review.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-black text-gray-800 tracking-tight">
                                        {review.name}
                                    </h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {review.college} <br />
                                        <span className="text-blue-400">{review.location}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}