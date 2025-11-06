"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import devPhoto from "@/public/images/developer.png"

const DeveloperProfile = () => {
    const developer = {
        name: "Abdur Rahim",
        title: "Full Stack Web Developer",
        photo: devPhoto, // আপনার আসল ছবি URL দিন
        email: "abdurrahim88557@gmail.com",
        phone: "+8801321040273",
        portfolio: "https://abdr.netlify.app",
        skills: [
            "React.js",
            "Next.js",
            "Node.js",
            "MongoDB",
            "Bootstrap CSS",
            "Tailwind CSS",
            "Shadcn",
            "Firebase",
            "Express.js",
        ],
        description:
            `আমি একজন অভিজ্ঞ ফুল-স্ট্যাক ওয়েব ডেভেলপার, আধুনিক ও কার্যকর ওয়েব অ্যাপ্লিকেশন তৈরি ও রক্ষণাবেক্ষণে দক্ষ। আমার লক্ষ্য হলো প্রযুক্তির ব্যবহারের মাধ্যমে যেকোনো খাতের জটিল সমস্যা সহজ ও সাশ্রয়ীভাবে সমাধান করা। ব্যক্তি, প্রতিষ্ঠান কিংবা ব্যবসা—সবাই যেন সহজেই তাদের কার্যক্রম পরিচালনা করতে পারে, সেই লক্ষ্যেই আমি কাজ করছি।""আমি একজন অভিজ্ঞ ফুল-স্ট্যাক ওয়েব ডেভেলপার, আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি ও রক্ষণাবেক্ষণে দক্ষ। শিক্ষাব্যবস্থাকে প্রযুক্তির মাধ্যমে সহজ করার লক্ষ্যেই কাজ করছি।`
    };

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 space-y-6">
            {/* Photo Card */}
            <Card className="flex justify-center shadow-md">
                <CardContent className="p-6">
                    <Image
                        width={500}
                        height={500}
                        src={developer.photo}
                        alt={"Campus computer"}
                        className=" w-[80%] h-auto md:w-[400px] md:h-[400px] rounded-full border-4 border-blue-500 mx-auto"
                    />
                </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="shadow-md">
                <CardContent className="p-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800">{developer.name}</h2>
                    <p className="text-blue-600 font-semibold">{developer.title}</p>
                    <p className="mt-2 text-gray-600">{developer.description}</p>

                    <div className="mt-4 space-y-1 text-sm text-gray-700 text-left">
                        <p>
                            <strong>ইমেইল:</strong> {developer.email}
                        </p>
                        <p>
                            <strong>ফোন:</strong> {developer.phone}
                        </p>
                        <p>
                            <strong>পোর্টফোলিও:</strong>{" "}
                            <a
                                href={developer.portfolio}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {developer.portfolio}
                            </a>
                        </p>
                    </div>

                    <div className="mt-4 text-left">
                        <h4 className="text-gray-700 font-semibold mb-2">দক্ষতা:</h4>
                        <ul className="flex flex-wrap gap-2">
                            {developer.skills.map((skill, idx) => (
                                <li
                                    key={idx}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DeveloperProfile;
