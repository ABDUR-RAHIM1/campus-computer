
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DataNotFound from "@/components/DataNotFound";
import EditProfileButton from "./components/EditProfileButton";
import { getMyProfileInfo } from "@/handlers/studentProfile";

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
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <p className="text-gray-700 mb-6">
                        নিচের লিঙ্কগুলো থেকে আপনি আপনার প্রয়োজনীয় অনলাইন আবেদন ফরম পূরণ করতে
                        পারেন। প্রতিটি সেবার জন্য আলাদা তথ্য, ফাইল আপলোড এবং পেমেন্ট প্রয়োজন
                        হতে পারে।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Link href="/campus-computer/services/honours" className="block bg-blue-50 p-4 border rounded hover:shadow-lg transition cursor-pointer">
                            <h4 className="font-semibold text-blue-700">🎓 অনার্স আবেদন</h4>
                            <p className="text-blue-600 text-sm mt-1">
                                ভর্তি ফরম, পেমেন্ট ও কনফার্মেশন সহ
                            </p>
                        </Link>

                        <Link href="/campus-computer/services/degree" className="block bg-green-50 p-4 border rounded hover:shadow-lg transition cursor-pointer">
                            <h4 className="font-semibold text-green-700">🏫 ডিগ্রী রেজিস্ট্রেশন</h4>
                            <p className="text-green-600 text-sm mt-1">
                                ডিগ্রী ১ম বর্ষ ও অন্যান্য আবেদন
                            </p>
                        </Link>

                        <Link href="/campus-computer/services/intermediate" className="block bg-yellow-50 p-4 border rounded hover:shadow-lg transition cursor-pointer">
                            <h4 className="font-semibold text-yellow-700">🧑‍🎓 ইন্টারমিডিয়েট সংশোধন</h4>
                            <p className="text-yellow-600 text-sm mt-1">নতুন রেজিস্ট্রেশন বা তথ্য আপডেট</p>
                        </Link>

                        <Link href="/campus-computer/services/confirmation" className="block bg-purple-50 p-4 border rounded hover:shadow-lg transition cursor-pointer">
                            <h4 className="font-semibold text-purple-700">✅ ভর্তি কনফার্মেশন</h4>
                            <p className="text-purple-600 text-sm mt-1">অফলাইনে পেমেন্ট জমা ও ট্র্যাকিং</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
