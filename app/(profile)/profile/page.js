"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function StudentProfile() {
    const profile = {
        name: "আব্দুর রহমান",
        email: "abdul@example.com",
        phone: "017XXXXXXXX",
        photo: "/images/about.png",
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Sidebar - Profile Summary */}
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Image
                        src={profile.photo}
                        alt="Profile Picture"
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-4 border"
                    />
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{profile.name}</h2>
                    <p className="text-gray-600">{profile.email}</p>
                    <p className="text-gray-600">📞 {profile.phone}</p>

                    <div className="mt-6 space-y-2 text-left">
                        <h3 className="font-semibold text-gray-800">📚 সেবাসমূহ</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/campus-computer/services/honours"
                                    className="text-blue-600 hover:underline"
                                >
                                    🎓 অনার্স ভর্তি আবেদন
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/campus-computer/services/degree"
                                    className="text-blue-600 hover:underline"
                                >
                                    🏫 ডিগ্রী রেজিস্ট্রেশন
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/campus-computer/services/intermediate"
                                    className="text-blue-600 hover:underline"
                                >
                                    🧑‍🎓 ইন্টারমিডিয়েট তথ্য সংশোধন
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/campus-computer/services/confirmation"
                                    className="text-blue-600 hover:underline"
                                >
                                    ✅ ভর্তি কনফার্মেশন জমা
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content - Dashboard or Instructions */}
                <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">👋 স্বাগতম, {profile.name}!</h3>

                    <p className="text-gray-700 mb-4">
                        নিচের লিঙ্কগুলো থেকে আপনি আপনার প্রয়োজনীয় অনলাইন আবেদন ফরম পূরণ করতে পারেন। প্রতিটি সেবার জন্য আলাদা তথ্য, ফাইল আপলোড এবং পেমেন্ট প্রয়োজন হতে পারে।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/campus-computer/services/honours">
                            <div className="bg-white p-4 border rounded hover:shadow-lg cursor-pointer">
                                <h4 className="font-semibold text-gray-800">🎓 অনার্স আবেদন</h4>
                                <p className="text-gray-600 text-sm">ভর্তি ফরম, পেমেন্ট ও কনফার্মেশন সহ</p>
                            </div>
                        </Link>
                        <Link href="/campus-computer/services/degree">
                            <div className="bg-white p-4 border rounded hover:shadow-lg cursor-pointer">
                                <h4 className="font-semibold text-gray-800">🏫 ডিগ্রী রেজিস্ট্রেশন</h4>
                                <p className="text-gray-600 text-sm">ডিগ্রী ১ম বর্ষ ও অন্যান্য আবেদন</p>
                            </div>
                        </Link>
                        <Link href="/campus-computer/services/intermediate">
                            <div className="bg-white p-4 border rounded hover:shadow-lg cursor-pointer">
                                <h4 className="font-semibold text-gray-800">🧑‍🎓 ইন্টারমিডিয়েট সংশোধন</h4>
                                <p className="text-gray-600 text-sm">নতুন রেজিস্ট্রেশন বা তথ্য আপডেট</p>
                            </div>
                        </Link>
                        <Link href="/campus-computer/services/confirmation">
                            <div className="bg-white p-4 border rounded hover:shadow-lg cursor-pointer">
                                <h4 className="font-semibold text-gray-800">✅ ভর্তি কনফার্মেশন</h4>
                                <p className="text-gray-600 text-sm">অফলাইনে পেমেন্ট জমা ও ট্র্যাকিং</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
