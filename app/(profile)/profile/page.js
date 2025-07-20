
import React from "react";
import Image from "next/image";
import DataNotFound from "@/components/DataNotFound";
import EditProfileButton from "./components/EditProfileButton";
import { getMyProfileInfo } from "@/handlers/studentProfile";
import Services from "./components/Services";
import MyServices from "./components/myServices/MyServices";

export default async function StudentProfile() {
    const { status, data } = await getMyProfileInfo();


    if (status !== 200) {
        return <DataNotFound text={data?.message || "ডাটা পাওয়া যায়নি"} />;
    }

    const requiredFields = [
        "username",
        "registrationNumber",
        "class",
        "department",
        "session",
        "phone",
        "email",
    ];

    const isProfileComplete = requiredFields.every(
        (field) => data[field] && data[field].trim() !== ""
    );

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-6">
                {/* Left Sidebar - Profile Summary */}
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <Image
                        src={data.photo || "/images/about.png"}
                        alt="Profile Picture"
                        width={140}
                        height={140}
                        className="rounded-full mx-auto mb-4 border border-gray-300 object-cover"
                    />
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                        {data.username || "--"}
                    </h2>
                    <p className="text-gray-600 mb-1">📞 {data.phone || "--"}</p>
                    <p className="text-gray-600 mb-4">{data.email || "--"}</p>

                    {/* Update Profile Button */}
                    <EditProfileButton />

                    <div className="text-left mt-6">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            📚 গুরুত্বপূর্ণ তথ্যসমূহ
                        </h3>
                        <ul className="space-y-1 list-disc list-inside text-gray-700 text-sm">
                            <li>নাম: {data.username || "__"}</li>
                            <li>ফোন: {data.phone || "__"}</li>
                            <li>রেজিস্ট্রেশন নম্বর: {data.registrationNumber || "__"}</li>
                            <li>ক্লাস: {data.class || "__"}</li>
                            <li>বিভাগ: {data.department || "__"}</li>
                            <li>সেশন: {data.session || "__"}</li>
                            <li>ক্লাস রোল: {data.classRoll || "__"}</li>
                            <li>বোর্ড রোল: {data.boardRoll || "__"}</li>
                            <li>পিন: {data.pin || "__"}</li>
                            <li>ইমেইল: {data.email || "__"}</li>
                            <li>অভিভাবকের ফোন: {data.guardianPhone || "__"}</li>
                            <li>ঠিকানা: {data.address || "__"}</li>
                            <li>জন্ম তারিখ: {data.birthDate || "__"}</li>
                            <li>লিঙ্গ: {data.gender || "__"}</li>
                            <li>রক্ত গ্রুপ: {data.bloodGroup || "__"}</li>
                            <li>ইনস্টিটিউটের নাম: {data.instituteName || "__"}</li>

                            {/* ✅ মানোন্নয়ন তথ্য */}
                            {data.hasImprovement && Array.isArray(data.improvementSubjects) && data.improvementSubjects.length > 0 && (
                                <li>
                                    <span className=" text-red-800 font-bold ">মানোন্নয়নের বিষয়সমূহ:</span>
                                    <ul className="list-disc list-inside ml-4">
                                        {data.improvementSubjects.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>

                    {!isProfileComplete && (
                        <p className="mt-6 text-sm text-red-600 bg-red-100 p-3 rounded">
                            ⚠️ আপনার প্রোফাইলের কিছু গুরুত্বপূর্ণ তথ্য পূরণ নেই। <br />
                            রেজিস্ট্রেশন নম্বর, ক্লাস, বিভাগ, সেশন, ফোন ও ইমেইল ঠিক না থাকলে
                            আমাদের সেবাসমূহ ব্যবহার করা সম্ভব হবে না।
                        </p>
                    )}
                </div>

                {/* Right Side - Main Content */}
                <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        👋 স্বাগতম, {data.username || "শিক্ষার্থী"}!
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        নিচে তালিকাভুক্ত সেবাগুলোর মাধ্যমে আপনি ঘরে বসেই কলেজের বিভিন্ন কাজ সম্পন্ন করতে পারবেন। প্রতিটি সেবার জন্য নির্দিষ্ট কিছু তথ্য প্রদান, প্রয়োজনীয় ডকুমেন্ট আপলোড এবং ফি পরিশোধের প্রয়োজন হতে পারে। <br /><br />

                        🛎️ আমাদের প্রতিটি সেবা আপনি অনলাইনে ঘরে বসেই নিতে পারবেন — আপনাকে আর কলেজ বা অফিসে এসে লম্বা লাইনে দাঁড়াতে হবে না। <br />
                        📤 আবেদন বাটনে ক্লিক করলেই আপনার নির্দিষ্ট ফি দেখাবে এবং ফী প্রদানের মাধ্যমে আমরা আপনার পক্ষ থেকে সকল আবেদন, ফরম পূরণ, ডকুমেন্ট প্রসেসিং ও সাবমিশন সম্পূর্ণ করে দিব। <br />
                        📱 আপনি আপনার প্রোফাইল থেকেই প্রতিটি আবেদনের আপডেট, অবস্থা (Status), ও কনফার্মেশন দেখতে পারবেন — ফলে সবকিছু থাকবে সম্পূর্ণ আপনার নিয়ন্ত্রণে। <br />
                        🧾 এটি একটি নিরাপদ ও নির্ভরযোগ্য ডিজিটাল সেবা, যেখানে আপনার সময় ও ঝামেলা দুটোই কমবে।
                    </p>

                    <Services />

                    <MyServices />

                </div>
            </div>


        </div>
    );
}
